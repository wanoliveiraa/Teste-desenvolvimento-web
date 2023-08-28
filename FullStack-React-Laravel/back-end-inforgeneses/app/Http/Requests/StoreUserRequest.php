<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * 
     *
     * @return bool
     */
    public function authorize()
    {
        return true; 
    }

    /**
     *
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:55', 
            'email' => 'required|email|unique:users,email',
            'password' => [ 
                'required', 
                Password::min(4) 
                   // ->letters() // Deve conter letras
                    //->symbols(), // Deve conter caracteres especiais
            ]
        ];
    }
}

