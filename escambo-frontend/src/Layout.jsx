import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="min-h-screen font-sans text-gray-900">
            {/* O Outlet é um "buraco" onde o Roteador vai encaixar suas páginas (Lar, Entrar, etc.) */}
            <Outlet />
        </div>
    );
}
