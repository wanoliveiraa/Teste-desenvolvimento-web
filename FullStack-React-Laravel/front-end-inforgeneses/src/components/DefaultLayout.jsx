import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/Context';
import axiosClient from "../Axios-client.js";
import {useEffect} from "react";
//Esse componente DefaultLayout é projetado para fornecer um layout padrão 
export default function DefaultLayout() {
  // obtem os dados do estado do contexto usando useStateContext
  const { user, token, setUser, setToken, notification } = useStateContext();

  // Verifica se há um token valido
  if (!token) {
    // Se não houver redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // lida com o logout
  const onLogout = e => {
    e.preventDefault();

    // faz uma solicitação POST para /logout
    axiosClient.post('/logout')
      .then(() => {
        // limpa as informacoes do usuario e do token no contexto
        setUser({});
        setToken(null);
      });
  };

  // efeito para carregar os dados do usuário
  useEffect(() => {
    // faz uma solicitação GET para user
    axiosClient.get('/user')
      .then(({ data }) => {
        // Atualiza as informações do usuário no contexto
        setUser(data);
      });
  }, []);

  // Renderização do componente
  return (
    <div id="defaultLayout">
      <aside>
        {/* Link para a rota /product */}
        <Link to="/product">Produto</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {/* Exibe o nome do usuário e um botão de logout */}
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Sair</a>
          </div>
        </header>
        <main>
          {/* Renderiza o conteúdo principal da página */}
          <Outlet />
        </main>
        {/* Exibe a notificação, se houver */}
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  );
}