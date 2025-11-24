import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";

export default function Entrar() {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <>
            <Head title="Entrar" />

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

                    <h1 className="text-3xl font-bold text-center mb-6">Entrar</h1>

                    <form onSubmit={submit} className="space-y-5">

                        {/* EMAIL */}
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                className="w-full mt-1 p-3 border rounded-lg"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm">{errors.email}</p>
                            )}
                        </div>

                        {/* SENHA */}
                        <div>
                            <label className="font-medium">Senha</label>
                            <input
                                type="password"
                                className="w-full mt-1 p-3 border rounded-lg"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm">{errors.password}</p>
                            )}
                        </div>

                        {/* BOTÃO */}
                        <button
                            disabled={processing}
                            className="w-full bg-red-800 text-white py-3 rounded-lg font-bold hover:bg-red-900 transition"
                        >
                            Entrar
                        </button>

                    </form>

                    <p className="text-center text-sm mt-4">
                        Não tem conta?{" "}
                        <a href="/cadastro" className="text-red-700 font-semibold">
                            Cadastre-se
                        </a>
                    </p>

                </div>
            </div>
        </>
    );
}
