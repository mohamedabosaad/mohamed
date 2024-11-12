import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useStore from '../store/useStore';

export default function Shop() {
  const { category } = useParams();
  const products = useStore((state) => 
    state.products.filter((product) => product.category === category)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-right">
        {category === 'phones' ? 'الهواتف' : 'الاكسسوارات'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}