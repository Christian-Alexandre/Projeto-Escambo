<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AnuncioController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        return Inertia::render('anuncios/Index', [
            'anuncios' => auth()->user()->anuncios()->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('anuncios/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'localizacao' => 'nullable|string',
            'categoria' => 'nullable|string',
            'imagem' => 'nullable|image|max:4080',
        ]);

        $data['user_id'] = auth()->id();

        if ($request->hasFile('imagem')) {
            $filename = time() . '-' . uniqid() . '.' . $request->file('imagem')->extension();
            $request->file('imagem')->move(public_path('anuncios'), $filename);
            $data['imagem'] = $filename;
        }

        Anuncio::create($data);

        return redirect()->route('anuncios.index');
    }

    public function edit(Anuncio $anuncio)
    {
        $this->authorize('update', $anuncio);

        return Inertia::render('anuncios/Edit', [
            'anuncio' => $anuncio,
        ]);
    }

    public function update(Request $request, Anuncio $anuncio)
    {
        $this->authorize('update', $anuncio);

        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'localizacao' => 'nullable|string',
            'categoria' => 'nullable|string',
            'imagem' => 'nullable|image|max:4080',
        ]);

        if ($request->hasFile('imagem')) {
            $filename = time() . '-' . uniqid() . '.' . $request->file('imagem')->extension();
            $request->file('imagem')->move(public_path('anuncios'), $filename);
            $data['imagem'] = $filename;
        }

        $anuncio->update($data);

        return redirect()->route('anuncios.index');
    }

    public function destroy(Anuncio $anuncio)
    {
        $this->authorize('delete', $anuncio);

        $anuncio->delete();

        return redirect()->route('anuncios.index');
    }
}
