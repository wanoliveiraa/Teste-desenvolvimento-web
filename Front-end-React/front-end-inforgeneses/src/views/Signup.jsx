import React from 'react'
import {Link} from "react-router-dom";


const onSubmit = (e) => {
  e.preventDefault()
}  
export default function Signup() {
  return (
    <div className='login-signup-from animated fadeInDown'>
      <div className='form'>
        <form onSubmit={onSubmit}>
          <h1 className='title'>Registo gratuito</h1>
          <input type="text" placeholder="Nome Completo"/>
          <input  type="email" placeholder="Email"/>
          <input  type="password" placeholder="Senha"/>
          <input  type="password" placeholder="Repetir Senha"/>
          <button className="btn btn-block">Registrar</button>
          <p className="message">Já está registado ? <Link to="/login">Iniciar sessão</Link></p>
        </form>  
      </div>    
    </div>)
}
