<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        /** @var \App\Models\User $user */
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

    public function logout(Request $request){
        // Verifica se o usuário está autenticado
        if (!$request->user()) {
            return response(['message' => 'Usuário não autenticado.'], 401);
        }
    
        // Obtém o token de acesso atual do usuário
        $currentToken = $request->user()->currentAccessToken();
    
        // Verifica se o token existe
        if ($currentToken) {
            // Revoga o token de acesso atual
            $currentToken->revoke();
            return response('', 204);
        } else {
            return response(['message' => 'Nenhum token de acesso encontrado.'], 404);
        }
    }
    
}
