import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';

import api from '../../services/api';

interface PropsFormData{
  name:String,
  email:String,
  whatsapp:String,
  city:string,
  uf:String
}

const Register = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<PropsFormData>();

  const onSubmit = async ({name, email, whatsapp, city, uf}:PropsFormData) => {
    try {
      const response = await api.post('/ongs', {
        name, email, whatsapp, city, uf
      })
      toast.success('Ong Cadastrada com Sucesso');
      toast.info(`Seu ID de acesso é: ${response.data.id}`, {
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      })

      history.push('/');
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logo} alt="Logo"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua Ong.</p>
          <Link className="link" to="/">
          <FiArrowLeft size={16} color="#E02041"/>
            Voltar para o Login
          </Link>
        </section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-input">
            {errors.name && <span className="error">*</span>}
            <input placeholder="Nome da ONG" 
            name="name" 
            ref={register({required: true, maxLength: 80})}
            className={`${errors.name ? "haserror" : ""}`}
            />
          </div>
          <div className="form-input">
            {errors.email && <span className="error">*</span>}
            <input type="email" 
            placeholder="E-mail" 
            name="email" 
            ref={register({required: true, maxLength: 100})}
            className={`${errors.email ? "haserror" : ""}`}
            />
          </div>
          
          <div className="form-input">
            {errors.whatsapp && <span className="error">*</span>}
            <input placeholder="Whatsapp" 
            name="whatsapp" 
            ref={register({required: true, maxLength: 14})} 
            className={`${errors.whatsapp ? "haserror" : ""}`}
            />
          </div>
          
          <div className="input-group">
            <div className="form-input">
              {errors.city && <span className="error">*</span>}
              <input placeholder="cidade" 
              name="city" 
              ref={register({required: true, maxLength: 50})}
              className={`${errors.city ? "haserror" : ""}`}
              />
            </div>

            <div className="form-input" style={{width:80}}>
              {errors.uf && <span className="error">*</span>}
              <input placeholder="UF" 
              style={{width:80}} 
              name="uf" 
              ref={register({required: true, min: 2, maxLength: 2})}
              className={`${errors.uf ? "haserror" : ""}`}
              /> 
            </div>
          </div>
          <button className="button">Cadastrar</button>
          <div className="displayErrors">
          {
            Object.keys(errors).length > 0  && 
            <span className="error">* Campo(s) de preenchimento obrigatório</span>
          }
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register;
