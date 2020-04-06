import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import {FiLogIn} from 'react-icons/fi'
import './styles.css';
import heroesimg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';
import { toast } from 'react-toastify';

import api from '../../services/api';

interface PropsFormData{
  id:string
}

const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<PropsFormData>();

  const onSubmit = ({id}:PropsFormData) => {
    api.post('/sessions', {id})
      .then(function(response){
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);
        toast.info(`Seja Bem Vinda ${response.data.name}`);

        history.push('/profile');
      })
      .catch(function(error){
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      })
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logo} alt="Logo" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Faça seu Login</h1>
          <input 
            placeholder="Informe sua ID"
            name="id" 
            ref={register({required: true})}
            className={`${errors.id ? "haserror" : ""}`}
          />
          {errors.id && <span className="error">* Campo de preenchimento obrigatorio</span>}
          
          <button className="button" type="submit">Entrar</button>
          
          <Link className="link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não Tenho Cadastro
          </Link>
        </form>

      </section>
      <img src={heroesimg} alt="Heroes"/>
    </div>
  )
}

export default Login;
