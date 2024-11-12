import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179',
    title: 'أحدث الهواتف الذكية',
    description: 'اكتشف مجموعتنا من أحدث الهواتف الذكية بأفضل الأسعار'
  },
  {
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b',
    title: 'اكسسوارات مميزة',
    description: 'اكسسوارات عالية الجودة لحماية وتجميل هاتفك'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Slider */}
      <div className="relative h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl mb-8">{slide.description}</p>
                  <Link
                    to="/shop/phones"
                    className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    تسوق الآن
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-2 rounded-full hover:bg-white/50 transition"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">الأقسام</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            to="/shop/phones"
            className="relative h-64 rounded-lg overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              alt="Phones"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">الهواتف</h3>
            </div>
          </Link>
          <Link
            to="/shop/accessories"
            className="relative h-64 rounded-lg overflow-hidden group"
          >
            <img
              src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528"
              alt="Accessories"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-2xl font-bold text-white">الاكسسوارات</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}