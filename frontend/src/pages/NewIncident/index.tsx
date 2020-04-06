import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import api from '../../services/api';

import './styles.css'

interface PropsFormData{
  title:String,
  description:String,
  value:number
}

const Incident = () => {
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<PropsFormData>();

  const onSubmit = async ({title, description, value}:PropsFormData) => {
    try {
      const header = {headers: { Authorization: ongId }};
      await api.post('/incidents', {title, description, value}, header )
      toast.info('Caso cadastrado com sucessso!!!');
      history.push('/profile');
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="incident-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logo"/>

          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso !!!</p>
          <Link className="link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Voltar para casos cadastrados
          </Link>
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input 
           placeholder="Titulo do caso"
           name="title" 
           ref={register({required: true, maxLength: 80})}
           className={`${errors.title ? "haserror" : ""}`}
          />
          {errors.title && <span className="error">* Campo de preenchiemnto obrigatorio</span>}

          <textarea 
            placeholder="Descrição"
            name="description" 
            ref={register({required: true, maxLength: 80})}
            className={`${errors.description ? "haserror" : ""}`} 
          />
          {errors.description && <span className="error">* Campo de preenchiemnto obrigatorio</span>}

          <input 
            placeholder="Valor em reais"
            name="value"
            ref={register({required: true, maxLength: 80})}
            className={`${errors.value ? "haserror" : ""}`} 
          />
          {errors.value && <span className="error">* Campo de preenchiemnto obrigatorio</span>}

          <button className="button" >Cadastrar</button>
        </form>
      </div>
    </div>
  )
}

export default Incident;
