<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /**
     *
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        // retorna uma coleção 
        return UserResource::collection(User::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * 
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request)
    {
        // valida os dados do formulario
        $data = $request->validated();

        // criptografa a senha
        $data['password'] = bcrypt($data['password']);

        // cria um novo usuário com os dados fornecidos
        $user = User::create($data);

        // Retorna o usuario 
        return response(new UserResource($user), 201);
    }

    /**
     * 
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
       
        return new UserResource($user);
    }

    /**
     * 
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        // Valida os dados do formulario
        $data = $request->validated();

        // Se uma nova senha for fornecida
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }

        // atualiza os dados do usuario com os novos dados
        $user->update($data);

        // retorna o usuario atualizado 
        return new UserResource($user);
    }

    /**
     * Remove um usuário específico do banco de dados.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        // Deleta o usuário do banco de dados
        $user->delete();

        // Retorna uma resposta vazia com status 204 (Sem Conteúdo)
        return response("", 204);
    }
}
