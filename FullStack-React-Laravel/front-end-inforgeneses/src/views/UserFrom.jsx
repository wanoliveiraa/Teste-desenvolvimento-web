import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../Axios-client.js";
import { useStateContext } from "../context/Context.jsx";

export default function UserForm() {
  // Obem a funcao navegar entre rotas
  const navigate = useNavigate();
  // usa o parametro"id" usando useParams
  let { id } = useParams();

  //  armazenar os dados do usuário
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });


  const [errors, setErrors] = useState(null);
  
  
  const [loading, setLoading] = useState(false);

 
  const { setNotification } = useStateContext();

  // Se o "id" estiver presente busca os dados do usuário
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/product/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

 
  const onSubmit = ev => {
    ev.preventDefault();
    
    // Se o "id" estiver presente faz uma requisição PUT (atualização)
    if (user.id) {
      axiosClient.put(`/product/${user.id}`, user)
        .then(() => {
          setNotification('O usuario foi atualizado com sucesso');
          navigate('/product'); 
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      // se o id não estiver presente, faz uma requisição POST 
      axiosClient.post('/product', user)
        .then(() => {
          setNotification('O usuario foi criado com sucesso');
          navigate('/product'); // lista de usuários após criar
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

 
  return (
    <>
   
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>Novo Usuario</h1>}

     
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors && (
          // Exibe mensagens de erro, se houver
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          // Formulário de edição/criação de usuário
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={ev => setUser({ ...user, name: ev.target.value })}
              placeholder="Nome"
            />
            <input
              value={user.email}
              onChange={ev => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
            />
            <input
              type="password"
              onChange={ev => setUser({ ...user, password: ev.target.value })}
              placeholder="Password"
            />
            <input
              type="password"
              onChange={ev =>
                setUser({ ...user, password_confirmation: ev.target.value })
              }
              placeholder="Password Confirmation"
            />
            <button className="btn">Salvar</button>
          </form>
        )}
      </div>
    </>
  );
}
