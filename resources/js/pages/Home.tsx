import React from "react";
import { Head } from "@inertiajs/react";
import Header from "../components/home/Header";
import ProductCarousel from "../components/home/ProductCarousel";

export interface Product {
    image: string;
    title: string;
    seller: string;
    location: string;
}

interface Props {
    destaque: Product[];
    perto: Product[];
    raras: Product[];
}

export default function Home({ destaque, perto, raras }: Props) {
    return (
        <>
            <Head title="ESCAMBO" />

            <div className="min-h-screen bg-gray-100">
                <Header />

                {/* HERO SECTION */}
                <div className="bg-gradient-to-br from-gray-800 to-black text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Bem-vindo ao ESCAMBO
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            A plataforma de trocas que conecta pessoas e produtos.
                        </p>
                    </div>
                </div>

                {/* CARROSSEIS */}
                <main className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
                    <ProductCarousel title="Destaques para Troca" products={destaque} />
                    <ProductCarousel title="Trocas perto de Você" products={perto} />
                    <ProductCarousel title="Trocas Raras" products={raras} />
                </main>
            </div>
        </>
    );
}
