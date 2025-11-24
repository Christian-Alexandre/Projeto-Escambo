import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MapPin, Bell, MessageCircle, Menu, Search } from 'lucide-react';

export default function Header() {

    // pega o usuário autenticado vindo do Inertia::share
    const { auth } = usePage().props;

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            {/* Top Bar */}
            <div className="bg-gray-100 border-b border-gray-200">
                <div className="container mx-auto px-4 py-2">
                    <div className="flex items-center justify-between">

                        {/* Logo */}
                        <h1
                            className="text-2xl md:text-3xl font-black"
                            style={{
                                WebkitTextStroke: '2px black',
                                textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                                fontFamily: 'Impact, Arial Black, sans-serif',
                                color: '#f5f5dc',
                            }}
                        >
                            ESCAMBO
                        </h1>

                        {/* Search Bar */}
                        <div className="flex items-center gap-3 flex-1 max-w-2xl mx-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Pesquisar"
                                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-red-700 text-sm"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>

                            <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-red-900 whitespace-nowrap">
                                <MapPin className="w-4 h-4" />
                                <span>Goiânia</span>
                            </button>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <Link href="/meus-anuncios" className="text-sm text-gray-700 hover:text-red-900 hidden md:block">
                                Meus Anúncios
                            </Link>

                            <button className="text-gray-700 hover:text-red-900 relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    3
                                </span>
                            </button>

                            <button className="text-gray-700 hover:text-red-900">
                                <MessageCircle className="w-5 h-5" />
                            </button>

                            <button className="text-gray-700 hover:text-red-900">
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* LOGIN / USER SECTION */}
                            {auth?.user ? (
                                // Usuário logado → mostra nome + botão sair
                                <div className="flex items-center gap-3">

                                    <span className="text-gray-700 font-semibold text-sm">
                                        {auth.user.name}
                                    </span>

                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 md:px-6 rounded-lg text-sm transition-all"
                                    >
                                        Sair
                                    </Link>

                                </div>
                            ) : (
                                // Usuário deslogado → botão entrar
                                <Link href="/login">
                                    <button className="bg-red-900 hover:bg-red-950 text-white font-bold py-2 px-4 md:px-6 rounded-lg text-sm transition-all">
                                        ENTRAR
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-center">
                        {['Todos', 'Eletrônicos', 'Moda', 'Esportes', 'Casa', 'Jogos', 'Livros', 'Música', 'Outros'].map((category) => (
                            <button
                                key={category}
                                className="flex-shrink-0 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-full transition-all"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
}
