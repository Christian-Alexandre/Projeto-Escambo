<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anuncio extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'descricao',
        'localizacao',
        'categoria',
        'imagem',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
