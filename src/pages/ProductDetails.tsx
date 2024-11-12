import React from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';

export default function ProductDetails() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = React.useState(0);
  const [autoplay, setAutoplay] = React.useState(true);
  
  const product = useStore((state) => 
    state.products.find((p) => p.id === id)
  );
  const addToCart = useStore((state) => state.addToCart);

  React.useEffect(() => {
    if (autoplay) {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % (product?.images.length || 1));
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [autoplay, product]);

  if (!product) {
    return <div className="text-center py-8">المنتج غير موجود</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('تمت الإضافة إلى السلة بنجاح', {
      duration: 2000,
      position: 'top-center',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src={product.images[currentImage]}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
          
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <button
              onClick={() => setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
              className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentImage((prev) => (prev + 1) % product.images.length)}
              className="bg-white/30 p-2 rounded-full hover:bg-white/50 transition"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImage(index);
                  setAutoplay(false);
                }}
                className={`w-3 h-3 rounded-full ${
                  currentImage === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="text-right">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          {product.condition === 'used' && (
            <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-sm mb-4">
              كسر زيرو
            </span>
          )}
          <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
          <div className="mb-8">
            <span className="text-2xl font-bold">{product.price} جنيه</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition text-lg"
          >
            <ShoppingCart className="h-6 w-6" />
            <span>أضف إلى السلة</span>
          </button>
        </div>
      </div>
    </div>
  );
}