

import { Link } from "react-router-dom";
import { useStateContext } from "../context/Context";
import axiosClient from "../Axios-client.js";
import { useEffect, useState } from "react";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  useEffect(() => {
    // Ao carregar o componente, busca a lista de usuários
    getUsers();
  }, []);

  const onDeleteClick = user => {
    // Ao clicar em deletar, exibe uma confirmação e, se confirmado, deleta o usuário
    if (!window.confirm("Tem certeza de que deseja deletar este usuário?")) {
      return;
    }
    axiosClient.delete(`/product/${user.id}`)
      .then(() => {
        // Define uma notificação de sucesso e recarrega a lista de usuários
        setNotification('Usuário foi deletado com sucesso');
        getUsers();
      });
  };

  const getUsers = () => {
    // Faz uma requisição para obter a lista de usuários
    setLoading(true);
    axiosClient.get('/product')
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
        <h1>Usuários</h1>
        <Link className="btn-add" to="/product/new">Adicionar novo</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Data de Criação</th>
              <th>Ações</th>
            </tr>
          </thead>
          {loading &&
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={'/product/' + u.id}>Editar</Link>
                    &nbsp;
                    <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  );
}
