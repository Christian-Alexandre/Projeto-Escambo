import React from 'react';
import { User } from 'lucide-react';

export default function ProductCard({ image, title, seller, location }) {
    return (
        <div className="flex-shrink-0 w-[180px] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
            <div className="relative bg-gray-200 h-[180px] flex items-center justify-center overflow-hidden">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-gray-400 text-4xl">📦</div>
                )}
            </div>
            <div className="p-3 bg-gradient-to-br from-gray-900 to-black">
                <h3 className="text-white font-bold text-sm mb-2 line-clamp-2 min-h-[40px]">{title}</h3>
                <div className="flex items-center justify-between gap-2">
                    <button className="bg-red-900 hover:bg-red-950 text-white text-xs font-bold py-1.5 px-3 rounded transition-all whitespace-nowrap">
                        Ver detalhes
                    </button>
                    <div className="flex items-center gap-1 overflow-hidden">
                        <User className="w-3 h-3 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-400 text-xs truncate">{seller}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}