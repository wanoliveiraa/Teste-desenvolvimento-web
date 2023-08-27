import React, { createRef } from 'react'
import {Link} from "react-router-dom";
import {useStateContext} from "../context/Context.jsx";


export default function Login() {

  // criação de referências para os campos do formulário
    const emailRef = createRef()
    const passwordRef = createRef()
    const {setUser, setToken} = useStateContext()
    
  
   // função que será chamada ao enviar o formulário
  const onSubmit = (e) =>{
    e.preventDefault()
  }


  return (
    <div className='login-signup-from animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Iniciar sessão na sua conta</h1>
          <input ref={emailRef} type="email" placeholder="Email"/>
          <input  ref={passwordRef} type="password" placeholder="Senha"/>
          <button className="btn btn-block">Login</button>
          <p className="message">Ainda não tem conta ? <Link to="/signup">Criar uma conta</Link></p>
        </form>
      </div>  
    </div>
  )
}
