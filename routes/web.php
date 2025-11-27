<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AnuncioController;

// ------------ HOME ------------
Route::get('/', function () {
    return Inertia::render('Home', [
        'destaque' => [
            [
                'image' => 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                'title' => 'Tênis Old Skool Black White',
                'seller' => 'Marcos',
                'location' => 'Goiânia'
            ],
            [
                'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
                'title' => 'Fone Bluetooth Premium',
                'seller' => 'João',
                'location' => 'Goiânia'
            ],
        ],

        'perto' => [
            [
                'image' => 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
                'title' => 'Carta Rara Pelé',
                'seller' => 'João',
                'location' => 'Goiânia'
            ],
        ],

        'raras' => [
            [
                'image' => 'https://images.unsplash.com/photo-1577741314755-048d8525d31e',
                'title' => 'Câmera Vintage Polaroid',
                'seller' => 'André',
                'location' => 'Goiânia'
            ],
        ],
    ]);
})->name('home');


// ------------ CRUD DE ANÚNCIOS (somente logado) ------------
Route::middleware(['auth'])->group(function () {

    Route::get('/meus-anuncios', [AnuncioController::class, 'index'])->name('anuncios.index');
    Route::get('/meus-anuncios/criar', [AnuncioController::class, 'create'])->name('anuncios.create');
    Route::post('/meus-anuncios', [AnuncioController::class, 'store'])->name('anuncios.store');

    Route::get('/meus-anuncios/{anuncio}/editar', [AnuncioController::class, 'edit'])->name('anuncios.edit');
    Route::put('/meus-anuncios/{anuncio}', [AnuncioController::class, 'update'])->name('anuncios.update');

    Route::delete('/meus-anuncios/{anuncio}', [AnuncioController::class, 'destroy'])->name('anuncios.destroy');
});


// ------------ ROTAS DO WORKOS E SETTINGS ------------
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
