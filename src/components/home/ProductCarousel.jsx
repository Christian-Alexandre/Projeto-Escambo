import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCarousel({ title, products }) {
    const scrollRef = React.useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{title}</h2>
            <div className="relative group flex justify-center">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product, index) => (
                        <ProductCard key={index} {...product} />
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
            </div>
        </div>
    );
}