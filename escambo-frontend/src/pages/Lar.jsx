import React from 'react';
import Header from '../components/home/Header';
import ProductCarousel from '../components/home/ProductCarousel';

export default function Home() {
    // Mock data - produtos de exemplo
    const destaqueProducts = [
        { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff', title: 'tênis old skool black white', seller: 'Marcos', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e', title: 'Fone de Ouvido Bluetooth Premium', seller: 'João', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', title: 'Relógio Digital Esportivo', seller: 'Ana', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f', title: 'Óculos de Sol Vintage', seller: 'Carlos', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad', title: 'Mochila Executiva Couro', seller: 'Paula', location: 'Goiânia' },
    ];
    const pertoProdutos = [
        { image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e', title: 'CARTA SUPER RARA PELÉ', seller: 'João', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5', title: 'Bicicleta Speed Profissional', seller: 'Pedro', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', title: 'Smartphone Top de Linha', seller: 'Maria', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d', title: 'Tênis de Corrida Nike', seller: 'Lucas', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77', title: 'Livros Clássicos Coleção', seller: 'Sofia', location: 'Goiânia' },
    ];
    const rarasProdutos = [
        { image: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e', title: 'Câmera Vintage Polaroid', seller: 'André', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167', title: 'Vinil Edição Limitada Beatles', seller: 'Rita', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f', title: 'Quadro Arte Contemporânea', seller: 'Thiago', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9', title: 'Console Retro Atari', seller: 'Fernanda', location: 'Goiânia' },
        { image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078', title: 'Instrumento Musical Violino', seller: 'Rafael', location: 'Goiânia' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            {/* Hero Section */}
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

            {/* Product Carousels */}
            <main className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
                <ProductCarousel title="Destaque para troca" products={destaqueProducts} />
                <ProductCarousel title="Trocas perto de Você" products={pertoProdutos} />
                <ProductCarousel title="Trocas Raras" products={rarasProdutos} />
            </main>
        </div>
    );
}