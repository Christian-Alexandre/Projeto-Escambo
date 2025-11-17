import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa o CSS principal
import './index.css'; 

// Importa seu Layout e suas páginas
import Layout from './Layout';
import Lar from './pages/Lar';
import Entrar from './pages/Entrar';
import Cadastro from './pages/Cadastro';

// 1. Define suas rotas
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, 
    children: [
      {
        path: '/', 
        element: <Lar />,
      },
      {
        path: '/entrar', 
        element: <Entrar />,
      },
      {
        path: '/cadastro', 
        element: <Cadastro />,
      },
    ],
  },
]);

// 2. Manda o React renderizar o roteador
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);