import React, { useState } from "react";
import { useForm, Link } from "@inertiajs/react";

interface Anuncio {
    id: number;
    titulo: string;
    categoria: string;
    descricao: string;
    localizacao: string;
    imagem: string | null;
}

export default function Edit({ anuncio }: { anuncio: Anuncio }) {
    const { data, setData, post, progress, processing, errors } = useForm({
        titulo: anuncio.titulo ?? "",
        categoria: anuncio.categoria ?? "",
        descricao: anuncio.descricao ?? "",
        localizacao: anuncio.localizacao ?? "",
        imagem: null as File | null,
    });

    const [preview, setPreview] = useState<string | null>(
        anuncio.imagem ? `/storage/${anuncio.imagem}` : null
    );

    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) {
            alert("A imagem deve ter no máximo 4MB.");
            return;
        }

        setData("imagem", file);
        setPreview(URL.createObjectURL(file));
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();

        post(`/meus-anuncios/${anuncio.id}`, {
            method: "put",
            forceFormData: true,
        });
    }

    return (
        <div className="min-h-screen bg-gray-200 p-4 md:p-10">

            {/* BOTÃO VOLTAR — IGUAL AO CREATE */}
            <div className="max-w-5xl mx-auto mb-4">
                <Link
                    href="/meus-anuncios"
                    className="bg-white border border-gray-400 px-6 py-2 rounded-full hover:bg-gray-100 transition text-black"
                >
                    ← Voltar
                </Link>
            </div>

            {/* CONTAINER PRINCIPAL — IGUAL AO CREATE */}
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">

                {/* LADO ESQUERDO (FORMULÁRIO) — IGUAL AO CREATE */}
                <form
                    onSubmit={submit}
                    className="w-full md:w-2/3 p-6 md:p-10 flex flex-col gap-6"
                >
                    <h2 className="text-xl font-bold text-gray-700">Editar Anúncio</h2>

                    {/* Modelo */}
                    <div>
                        <label className="font-semibold text-sm text-gray-700">
                            Modelo do produto
                        </label>
                        <input
                            type="text"
                            className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-700"
                            value={data.titulo}
                            onChange={(e) => setData("titulo", e.target.value)}
                        />
                        {errors.titulo && (
                            <p className="text-red-600 text-sm mt-1">{errors.titulo}</p>
                        )}
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="font-semibold text-sm text-gray-700">
                            Categoria
                        </label>
                        <input
                            type="text"
                            className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-700"
                            value={data.categoria}
                            onChange={(e) => setData("categoria", e.target.value)}
                        />
                    </div>

                    {/* Localização */}
                    <div>
                        <label className="font-semibold text-sm text-gray-700">
                            Localização
                        </label>
                        <input
                            type="text"
                            className="w-full mt-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-red-700"
                            value={data.localizacao}
                            onChange={(e) => setData("localizacao", e.target.value)}
                        />
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="font-semibold text-sm text-gray-700">
                            Descrição
                        </label>
                        <textarea
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-700"
                            rows={3}
                            value={data.descricao}
                            onChange={(e) => setData("descricao", e.target.value)}
                        />
                    </div>

                    {/* Barra de progresso */}
                    {progress && (
                        <div className="w-full bg-gray-300 rounded h-3 overflow-hidden">
                            <div
                                className="bg-red-700 h-3 transition-all"
                                style={{ width: `${progress.percentage}%` }}
                            />
                        </div>
                    )}

                    {/* Botão salvar — igual formato do create */}
                    <button
                        type="submit"
                        disabled={processing}
                        className={`${
                            processing ? "opacity-50" : ""
                        } bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-full shadow`}
                    >
                        {processing ? "Salvando..." : "Salvar alterações"}
                    </button>
                </form>

                {/* LADO DIREITO (IMAGENS) — IGUAL AO CREATE */}
                <div className="w-full md:w-1/3 bg-gradient-to-b from-red-800 to-red-600 p-8 text-center text-white flex flex-col">
                    <h2 className="text-2xl font-bold mb-6">Fotos</h2>

                    {/* Preview da imagem */}
                    <div className="mb-4">
                        {preview ? (
                            <img
                                src={preview}
                                className="w-full rounded-lg shadow border"
                            />
                        ) : (
                            <div className="w-full h-40 rounded-lg bg-white/20 flex items-center justify-center">
                                Nenhuma imagem
                            </div>
                        )}
                    </div>

                    {/* Botão de upload — igual ao create */}
                    <label className="bg-white text-gray-700 cursor-pointer py-3 rounded-lg shadow font-semibold">
                        Selecionar nova foto
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImage}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
