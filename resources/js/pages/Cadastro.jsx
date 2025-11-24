import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import InputField from '../components/auth/InputField';

export default function Cadastro() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Placeholder para chamada API Laravel
        console.log('Cadastro data:', formData);
        // await axios.post('/api/cadastro', formData);
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex flex-col md:flex-row min-h-[600px]">
                    {/* Coluna Esquerda - Gradiente */}
                    <div className="w-full md:w-1/2 bg-gradient-to-br from-red-900 via-red-800 to-black p-12 flex flex-col justify-center items-center text-white">
                        <div className="flex flex-col items-center justify-center h-full space-y-8 w-full max-w-sm mx-auto">
                            <div className="flex justify-center">
                                <img 
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6918d65c94eea22d7ba10fa0/d46ab7868_BCO42c9f2b1-8616-4e0a-a556-4c90711c50841.png" 
                                    alt="ESCAMBO" 
                                    className="h-24 w-auto"
                                />
                            </div>
                      
                            <div className="space-y-6 text-center">
                                <h2 className="text-2xl font-bold">
                                    Seja bem vindo!
                                </h2>
                                <p className="text-lg">
                                    Acesse sua conta agora mesmo.
                                </p>
                            </div>

                            <Link to={createPageUrl('Entrar')} className="w-full">
                                <button className="w-full border-2 border-white text-white font-bold py-3 px-12 rounded-full hover:bg-white hover:text-red-900 transition-all duration-200">
                                    ENTRAR
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Coluna Direita - Formulário */}
                    <div className="w-full md:w-1/2 bg-gray-100 p-12 flex flex-col justify-center">
                        <div className="flex flex-col justify-center h-full max-w-md mx-auto w-full">
                            <h2 className="text-4xl font-black text-center mb-2 text-gray-800">
                                Crie sua conta
                            </h2>
                            
                            <p className="text-center text-gray-600 mb-8 font-medium">
                                Preencha o formulário
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <InputField
                                    type="text"
                                    name="name"
                                    placeholder="Nome"
                                    value={formData.name}
                                    onChange={handleChange}
                                    icon="user"
                                />
                                <InputField
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    icon="email"
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="Senha"
                                    value={formData.password}
                                    onChange={handleChange}
                                    icon="password"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-red-900 hover:bg-red-950 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    CADASTRAR
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}