<?php

namespace App\Policies;

use App\Models\Anuncio;
use App\Models\User;

class AnuncioPolicy
{
    public function update(User $user, Anuncio $anuncio): bool
    {
        return $user->id === $anuncio->user_id;
    }

    public function delete(User $user, Anuncio $anuncio): bool
    {
        return $user->id === $anuncio->user_id;
    }
}
