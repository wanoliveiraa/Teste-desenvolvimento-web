import React, { createRef } from 'react'
import {Link} from "react-router-dom";
import {useStateContext} from "../context/Context.jsx";
import { useState } from "react";
import axiosClient from "../Axios-client.js";


export default function Login() {

  // criação de referências para os campos do formulário
    const emailRef = createRef()
    const passwordRef = createRef()
    const {setUser, setToken} = useStateContext()
    const [message, setMessage] = useState(null)
    
  
   // função que será chamada ao enviar o formulário
  const onSubmit = (e) =>{
    e.preventDefault()

    // aqui é a construção do objeto com os dados do formulário
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
       //enviando a requisao para login 
      axiosClient.post('/login', payload)//backend
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token);
    })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }


  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Iniciar sessão na sua conta</h1>

          {message && //um alerta de messagem
            <div className="alert">
              <p>{message}</p>
            </div>
          }

          <input ref={emailRef} type="email" placeholder="Email"/>
          <input  ref={passwordRef} type="password" placeholder="Senha"/>
          <button className="btn btn-block">Login</button>
          <p className="message">Ainda não tem conta ? <Link to="/signup">Criar uma conta</Link></p>
        </form>
      </div>
    </div>
  )
}
