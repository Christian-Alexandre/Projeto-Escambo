import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, progress, errors } = useForm({
        titulo: "",
        categoria: "",
        descricao: "",
        localizacao: "",     // <-- ADICIONADO
        imagens: [] as File[],
    });

    const [previews, setPreviews] = useState<string[]>([]);
    const [isDirty, setIsDirty] = useState(false);
    const [exitModal, setExitModal] = useState(false);

    // Detecta alterações no formulário e previne unload
    useEffect(() => {
        const hasChanges =
            data.titulo !== "" ||
            data.categoria !== "" ||
            data.descricao !== "" ||
            data.localizacao !== "" ||   // <-- incluído na verificação
            data.imagens.length > 0;

        setIsDirty(hasChanges);

        const onBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasChanges) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [data]);

    // Manipulação de imagens (limite 4, 4MB cada) + previews
    function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);

        if (files.length > 4) {
            alert("Você pode enviar no máximo 4 fotos.");
            return;
        }

        for (const f of files) {
            if (f.size > 4 * 1024 * 1024) {
                alert(`A imagem ${f.name} excede 4 MB.`);
                return;
            }
        }

        setData("imagens", files);

        // gerar previews e revogar antigos
        setPreviews((prev) => {
            prev.forEach((url) => URL.revokeObjectURL(url));
            return files.map((f) => URL.createObjectURL(f));
        });
    }

    // Submit
    function submit(e: React.FormEvent) {
        e.preventDefault();

        if (!data.titulo && !data.categoria && !data.descricao && !data.localizacao) {
            alert("Preencha ao menos um campo antes de enviar!");
            return;
        }

        post("/meus-anuncios", {
            forceFormData: true,
            onSuccess: () => {
                window.onbeforeunload = null;
            },
        });
    }

    return (
        <div className="min-h-screen bg-gray-200 p-6 flex justify-center items-start">
            <div className="bg-white w-full max-w-4xl shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">

                {/* FORM LEFT */}
                <form onSubmit={submit} className="w-full md:w-2/3 p-8 flex flex-col gap-6 text-black">

                    <h1 className="text-2xl font-bold">Criar Anúncio</h1>

                    {/* Modelo */}
                    <div>
                        <label className="font-semibold">Modelo do produto</label>
                        <input
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData("titulo", e.target.value)}
                            className="w-full mt-1 border px-4 py-2 rounded-lg"
                        />
                        {errors.titulo && <div className="text-red-600 text-sm mt-1">{errors.titulo}</div>}
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="font-semibold">Categoria</label>
                        <input
                            type="text"
                            value={data.categoria}
                            onChange={(e) => setData("categoria", e.target.value)}
                            className="w-full mt-1 border px-4 py-2 rounded-lg"
                        />
                        {errors.categoria && <div className="text-red-600 text-sm mt-1">{errors.categoria}</div>}
                    </div>

                    {/* Localização (novo) */}
                    <div>
                        <label className="font-semibold">Localização</label>
                        <input
                            type="text"
                            value={data.localizacao}
                            onChange={(e) => setData("localizacao", e.target.value)}
                            className="w-full mt-1 border px-4 py-2 rounded-lg"
                            placeholder="Cidade, Bairro (ex: Goiânia, Setor Central)"
                        />
                        {errors.localizacao && <div className="text-red-600 text-sm mt-1">{errors.localizacao}</div>}
                    </div>

                    {/* Descrição */}
                    <div>
                        <label className="font-semibold">Descrição</label>
                        <textarea
                            rows={3}
                            value={data.descricao}
                            onChange={(e) => setData("descricao", e.target.value)}
                            className="w-full mt-1 border px-4 py-2 rounded-lg"
                        />
                        {errors.descricao && <div className="text-red-600 text-sm mt-1">{errors.descricao}</div>}
                    </div>

                    {/* Barra de progresso */}
                    {progress && (
                        <div className="w-full bg-gray-300 rounded h-2 overflow-hidden">
                            <div
                                className="bg-red-600 h-2"
                                style={{ width: `${progress.percentage}%` }}
                            ></div>
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg shadow font-semibold"
                        >
                            {processing ? "Enviando..." : "Postar"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                if (isDirty) {
                                    setExitModal(true);
                                } else {
                                    history.back();
                                }
                            }}
                            className="px-4 py-2 rounded-lg border"
                        >
                            Voltar
                        </button>
                    </div>
                </form>

                {/* RIGHT — Fotos */}
                <div className="w-full md:w-1/3 bg-gradient-to-b from-red-700 to-red-500 p-6 text-white flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Fotos</h2>
                    <p className="text-sm mb-4">Adicione até 4 imagens</p>

                    <div className="grid grid-cols-2 gap-2 mb-4 w-full">
                        {Array.isArray(previews) && previews.length > 0 ? (
                            previews.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    className="w-full h-24 object-cover rounded-lg border"
                                    alt={`preview-${i}`}
                                />
                            ))
                        ) : (
                            <div className="col-span-2 h-24 bg-white/20 rounded-lg flex items-center justify-center text-sm">
                                Nenhuma foto selecionada
                            </div>
                        )}
                    </div>

                    <label className="bg-white text-black px-4 py-2 rounded-lg cursor-pointer font-semibold shadow">
                        Selecionar fotos
                        <input type="file" multiple className="hidden" accept="image/*" onChange={handleImages} />
                    </label>
                </div>
            </div>

            {/* MODAL DE SAIR SEM SALVAR */}
            {exitModal && (
                <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80 text-black">
                        <h2 className="text-lg font-semibold mb-3">Sair sem salvar?</h2>
                        <p className="text-sm mb-6">Você possui alterações não salvas.</p>

                        <div className="flex justify-end gap-4">
                            <button onClick={() => setExitModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                                Cancelar
                            </button>

                            <button
                                onClick={() => {
                                    window.onbeforeunload = null;
                                    history.back();
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Sair
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
