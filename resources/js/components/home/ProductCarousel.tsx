import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
    image: string;
    title: string;
    seller: string;
    location: string;
}

interface Props {
    title: string;
    products: Product[];
}

export default function ProductCarousel({ title, products }: Props) {
    const carouselRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = () => {
        carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <section className="relative my-10 w-full">

            {/* TÍTULO */}
            <h2 className="text-2xl font-extrabold mb-6 text-gray-900">
                {title}
            </h2>

            {/* BOTÃO ESQUERDO */}
            <button
                onClick={scrollLeft}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2
                           bg-gray-900 text-white p-3 rounded-full shadow-lg
                           hover:bg-gray-800 transition z-10"
            >
                <ChevronLeft size={20} />
            </button>

            {/* BOTÃO DIREITO */}
            <button
                onClick={scrollRight}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2
                           bg-gray-900 text-white p-3 rounded-full shadow-lg
                           hover:bg-gray-800 transition z-10"
            >
                <ChevronRight size={20} />
            </button>

            {/* LISTA DE CARDS */}
            <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2"
            >
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </section>
    );
}
