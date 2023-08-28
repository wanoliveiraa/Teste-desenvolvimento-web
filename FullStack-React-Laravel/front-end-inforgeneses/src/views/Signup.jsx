import {Link} from "react-router-dom";
import {createRef, useState} from "react";
import axiosClient from "../Axios-client.js";
import {useStateContext} from "../context/Context.jsx";

export default function Signup() {
  // criação de referências para os campos do formulário
  const nameRef = createRef()
  const emailRef = createRef()
  const passwordRef = createRef()
  const passwordConfirmationRef = createRef()
  const {setUser, setToken} = useStateContext()
  const [errors, setErrors] = useState(null)

  
  // função que será chamada ao enviar o formulário
  const onSubmit = e => {
    e.preventDefault()

    // aqui é a construção do objeto com os dados do formulário
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    //enviando a requisão para singnup
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        // atualizando estado do usuário e token com os dados da resposta
        setUser(data.user)
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
        <h1 className='title'>Registo gratuito</h1>
          {errors &&
            <div className="alert">
              {Object.keys(errors).map(key => (
                <p key={key}>{errors[key][0]}</p>
              ))}
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Nome Completo"/>
          <input  ref={emailRef} type="email" placeholder="Email"/>
          <input  ref={passwordRef} type="password" placeholder="Senha"/>
          <input  ref={passwordConfirmationRef} type="password" placeholder="Repetir Senha"/>
          <button className="btn btn-block">Registrar</button>
          <p className="message">Já está registado ? <Link to="/login">Iniciar sessão</Link></p>
        </form>
      </div>
    </div>
  )
}



