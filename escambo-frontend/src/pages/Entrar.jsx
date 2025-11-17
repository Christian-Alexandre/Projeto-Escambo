import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import SSOButton from '../components/auth/SSOButton';
import InputField from '../components/auth/InputField';

export default function Entrar() {
    const [formData, setFormData] = useState({
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
        console.log('Login data:', formData);
        // await axios.post('/api/login', formData);
    };

    const handleSSOLogin = (provider) => {
        // Placeholder para SSO - redireciona para endpoint Laravel
        console.log(`SSO Login with ${provider}`);
        // window.location.href = `/api/auth/${provider.toLowerCase()}`;
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
                                    className="h-32 w-auto"
                                />
                            </div>
                            
                            <div className="space-y-4 w-full">
                                <SSOButton 
                                    provider="Google" 
                                    onClick={() => handleSSOLogin('Google')}
                                />
                                <SSOButton 
                                    provider="Facebook" 
                                    onClick={() => handleSSOLogin('Facebook')}
                                />
                            </div>

                            <Link to={createPageUrl('Cadastro')} className="w-full">
                                <button className="w-full border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-red-900 transition-all duration-200">
                                    Fazer cadastro
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Coluna Direita - Formulário */}
                    <div className="w-full md:w-1/2 bg-gray-100 p-12 flex flex-col justify-center">
                        <div className="flex flex-col justify-center h-full max-w-md mx-auto w-full">
                            <p className="text-center text-gray-700 mb-8 font-medium">
                                Continuar com o e-mail e senha
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                <div className="text-right">
                                    <a href="#" className="text-sm text-gray-600 hover:text-red-700 transition-colors">
                                        Esqueceu sua senha?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-red-900 hover:bg-red-950 text-white font-bold py-3 px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    ENTRAR
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}