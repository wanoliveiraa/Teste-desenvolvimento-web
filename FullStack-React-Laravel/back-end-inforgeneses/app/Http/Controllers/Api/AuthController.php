<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
       // valida as credenciais do login 
       $credentials = $request->validated();

       // tenta autenticar o usuário usando as credenciais
       if (!Auth::attempt($credentials)) {
           // retorna uma mensagem de erro se a autenticação falhar
           return response([
               'message' => 'O email fornecido ou a senha estão incorrectos'
           ], 422);
       }
       // pega o usuario autenticado
       $user = Auth::user();

       // cria um novo token para o usuário
       $token = $user->createToken('main')->plainTextToken;
       // retorna o usuário e o token como resposta
       return response(compact('user', 'token'));
    }

    public function signup(SignupRequest $request){
        // valida as credenciais de login 
        $data = $request->validated();
        /** @var \App\Models\User $user */

        // cria um novo usuario no banco de dados
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        //Cria um token para o usuário
        $token = $user->createToken('main')->plainTextToken;
        // retorna o usuario e o token como resposta
        return response(compact('user', 'token'));
    }

    public function loginout(Request $request){
        /** @var \App\Models\User $user */
         // pega o usuario autenticado a partir do request
         $user = $request->user();

         // o token de acesso atual do usuario
         $user->currentAccessToken()->delete();
 
         //retorna uma resposta vazia 
         return response('', 204);
    }
}
