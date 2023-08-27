import React from 'react'
import {Link} from "react-router-dom";

const onSubmit = (e) =>{
  e.preventDefault()
}


export default function Login() {
  return (
    <div className='login-signup-from animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Iniciar sessão na sua conta</h1>
          <input  type="email" placeholder="Email"/>
          <input  type="password" placeholder="Password"/>
          <button className="btn btn-block">Login</button>
          <p className="message">Ainda não tem conta ? <Link to="/signup">Criar uma conta</Link></p>
        </form>
      </div>  
    </div>
  )
}
