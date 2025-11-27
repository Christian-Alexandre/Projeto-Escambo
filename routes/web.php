<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AnuncioController;
use App\Http\Controllers\HomeController;

// ------------ HOME REAL (com produtos do banco) ------------
Route::get('/', [HomeController::class, 'index'])->name('home');

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
