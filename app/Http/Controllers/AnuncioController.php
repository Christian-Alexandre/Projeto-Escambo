<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AnuncioController extends Controller
{
    use AuthorizesRequests;

    // LISTA DOS ANÚNCIOS DO USUÁRIO
    public function index()
    {
        return Inertia::render('anuncios/Index', [
            'anuncios' => auth()->user()->anuncios()->latest()->get(),
        ]);
    }

    // FORMULÁRIO DE CRIAÇÃO
    public function create()
    {
        return Inertia::render('anuncios/Create');
    }

    // SALVAR NOVO ANÚNCIO
    public function store(Request $request)
    {
        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'localizacao' => 'nullable|string',
            'categoria' => 'nullable|string',
            'imagem' => 'nullable|image|max:4096',
        ]);

        $data['user_id'] = auth()->id();

        // ===== SALVAR IMAGEM EM public/anuncios =====
        if ($request->hasFile('imagem')) {

            // cria a pasta se não existir
            $folder = public_path('anuncios');
            if (!file_exists($folder)) {
                mkdir($folder, 0777, true);
            }

            // gera nome único
            $filename = time() . '-' . uniqid() . '.' . $request->file('imagem')->extension();

            // move a imagem
            $request->file('imagem')->move($folder, $filename);

            // salva nome no banco
            $data['imagem'] = $filename;
        }

        Anuncio::create($data);

        return redirect()->route('anuncios.index');
    }

    // FORMULÁRIO DE EDIÇÃO
    public function edit(Anuncio $anuncio)
    {
        $this->authorize('update', $anuncio);

        return Inertia::render('anuncios/Edit', [
            'anuncio' => $anuncio,
        ]);
    }

    // ATUALIZAR ANÚNCIO
    public function update(Request $request, Anuncio $anuncio)
    {
        $this->authorize('update', $anuncio);

        $data = $request->validate([
            'titulo' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'localizacao' => 'nullable|string',
            'categoria' => 'nullable|string',
            'imagem' => 'nullable|image|max:4096',
        ]);

        // ===== ATUALIZAR IMAGEM =====
        if ($request->hasFile('imagem')) {

            $folder = public_path('anuncios');
            if (!file_exists($folder)) {
                mkdir($folder, 0777, true);
            }

            $filename = time() . '-' . uniqid() . '.' . $request->file('imagem')->extension();
            $request->file('imagem')->move($folder, $filename);

            $data['imagem'] = $filename;
        }

        $anuncio->update($data);

        return redirect()->route('anuncios.index');
    }

    // DELETAR ANÚNCIO
    public function destroy(Anuncio $anuncio)
    {
        $this->authorize('delete', $anuncio);

        // opcional: remover imagem física
        if ($anuncio->imagem) {
            $path = public_path('anuncios/' . $anuncio->imagem);
            if (file_exists($path)) {
                unlink($path);
            }
        }

        $anuncio->delete();

        return redirect()->route('anuncios.index');
    }
}
