import React from "react";
import { Link, router } from "@inertiajs/react";

interface Anuncio {
    id: number;
    titulo: string;
    categoria: string;
    localizacao: string;
    imagens?: { caminho: string }[];
}

export default function Index({ anuncios }: { anuncios: Anuncio[] }) {

    function remover(id: number) {
        if (confirm("Tem certeza que deseja remover este anúncio?")) {
            router.delete(`/meus-anuncios/${id}`);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* Logo como botão voltar */}
            <Link href="/" className="inline-block mb-6">
                <img
                    src="/logo.png"
                    alt="Escambo Logo"
                    className="h-12 md:h-16 object-contain cursor-pointer select-none"
                    draggable="false"
                />
            </Link>

            {/* Título + Botão Criar */}
            <div className="max-w-6xl mx-auto flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Meus Anúncios
                </h1>

                <Link
                    href="/meus-anuncios/criar"
                    className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-full font-semibold shadow"
                >
                    Criar anúncio
                </Link>
            </div>

            {/* Grid de cards */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {anuncios.map((anuncio) => (
                    <div
                        key={anuncio.id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                    >
                        {/* Imagem */}
                        <img
                            src={
                                anuncio.imagens?.length
                                    ? `/storage/${anuncio.imagens[0].caminho}`
                                    : "https://via.placeholder.com/400x300?text=Sem+imagem"
                            }
                            className="w-full h-48 object-cover"
                        />

                        {/* Conteúdo */}
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-gray-800">
                                {anuncio.titulo}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {anuncio.categoria || "Sem categoria"} —{" "}
                                {anuncio.localizacao || "Sem localização"}
                            </p>

                            {/* Botões */}
                            <div className="flex justify-between mt-4">
                                <Link
                                    href={`/meus-anuncios/${anuncio.id}/editar`}
                                    className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                >
                                    Editar
                                </Link>

                                <button
                                    onClick={() => remover(anuncio.id)}
                                    className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {anuncios.length === 0 && (
                <p className="text-center text-gray-600 mt-10">
                    Você ainda não criou nenhum anúncio.
                </p>
            )}
        </div>
    );
}
