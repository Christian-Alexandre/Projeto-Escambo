import React from "react";
import { User } from "lucide-react";

interface Product {
    // Formato antigo (home estático)
    image?: string;
    title?: string;
    seller?: string;
    location?: string;

    // Formato novo (anúncios reais)
    id?: number;
    titulo?: string;
    imagem?: string | null;
    localizacao?: string | null;
    user?: {
        name?: string;
    };
}

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    // Compatibilidade com os dois formatos
    const image =
        product.imagem
            ? `/anuncios/${product.imagem}`
            : product.image
                ? product.image
                : "https://via.placeholder.com/400x300?text=Sem+imagem";

    const title = product.titulo ?? product.title ?? "Produto sem nome";
    const seller = product.user?.name ?? product.seller ?? "Usuário";
    const location = product.localizacao ?? product.location ?? "";

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer w-64">

            {/* IMAGEM */}
            <div className="w-full h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* CONTEÚDO */}
            <div className="bg-[#0d0d0d] text-white px-4 py-3">

                {/* Título */}
                <h3 className="text-sm font-bold leading-tight">
                    {title}
                </h3>

                {/* Botão + Dono */}
                <div className="flex items-center justify-between mt-3">

                    <button className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold px-3 py-1 rounded">
                        Ver detalhes
                    </button>

                    <div className="flex items-center gap-1 text-xs text-gray-300">
                        <User className="w-4 h-4" />
                        <span>{seller}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
