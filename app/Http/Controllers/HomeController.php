<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Pegando anúncios reais
        $anuncios = Anuncio::latest()->take(10)->get();

        // Convertendo para o formato que o Home.tsx usa
        $produtos = $anuncios->map(function ($a) {
            return [
                'title' => $a->titulo,
                'seller' => $a->user->name ?? 'Usuário',
                'location' => $a->localizacao ?? 'Não informado',
                'image' => $a->imagem 
                    ? "/anuncios/{$a->imagem}" 
                    : "https://via.placeholder.com/400x300?text=Sem+imagem",
            ];
        });

        return Inertia::render("Home", [
            "destaque" => $produtos,
            "perto" => $produtos,
            "raras" => $produtos,
        ]);
    }
}
