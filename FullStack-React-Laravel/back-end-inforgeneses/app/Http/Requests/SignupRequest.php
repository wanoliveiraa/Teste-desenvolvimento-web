<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        //permitimos a solicitação, pois não há autenticação necessaria
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'email' => ['required', 'email', 'unique:users,email'],
            'password' => [
                'required', // A senha é obrigatoria
                'confirmed', // A senha deve ser confirmada no react tem password_con
                Password::min(4) // A senha deve ter pelo menos 4 caracter
                    //->letters()   // Deve conter letras
                    //->symbols()   // Deve conter símbolos
                    //->numbers()   // Deve conter números
            ]  
        ];
    }
}
