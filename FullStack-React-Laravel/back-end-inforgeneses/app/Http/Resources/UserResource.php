<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    // Define que o recurso não deve ser encapsulado em uma chave de "data"
    public static $wrap = false;

    /**
     *
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // Retorna um array contendo informacoes do user
        return [
            'id' => $this->id, // ID do usuário
            'name' => $this->name, // Nome do usuário
            'email' => $this->email, // Email do usuário
            'created_at' => $this->created_at->format('Y-m-d H:i:s'), 
        ];
    }
}

