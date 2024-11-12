import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    condition: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('تمت الإضافة إلى السلة بنجاح', {
      duration: 2000,
      position: 'top-center',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product.id}`} className="block relative h-64 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
        />
        {product.condition === 'used' && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
            كسر زيرو
          </span>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-semibold mb-2 text-right">{product.name}</h3>
        </Link>
        <p className="text-gray-600 mb-4 text-right line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>أضف للسلة</span>
          </button>
          <span className="text-lg font-bold">{product.price} جنيه</span>
        </div>
      </div>
    </div>
  );
}