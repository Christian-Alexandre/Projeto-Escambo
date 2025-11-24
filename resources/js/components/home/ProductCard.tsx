import React from "react";
import { User } from "lucide-react";

interface Product {
    image: string;
    title: string;
    seller: string;
    location: string;
}

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer w-64">
            
            {/* IMAGEM */}
            <div className="w-full h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* CONTEÚDO (Fundo preto igual ao ESCAMBO) */}
            <div className="bg-[#0d0d0d] text-white px-4 py-3">

                {/* Título */}
                <h3 className="text-sm font-bold leading-tight">
                    {product.title}
                </h3>

                {/* Botão + Dono */}
                <div className="flex items-center justify-between mt-3">

                    {/* Botão Ver detalhes */}
                    <button className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold px-3 py-1 rounded">
                        Ver detalhes
                    </button>

                    {/* Usuário */}
                    <div className="flex items-center gap-1 text-xs text-gray-300">
                        <User className="w-4 h-4" />
                        <span>{product.seller}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
