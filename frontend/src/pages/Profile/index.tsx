import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import { toast } from 'react-toastify';

import api from '../../services/api';

import './styles.css'

interface PropsIncident{
  id:string,
  title:string,
  description:string,
  value:number
}

const Profile = () => {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  const [incidents, setIncidents] = useState<PropsIncident[]>([]);

  useEffect(()=>{
    async function getData(){
      const header = {headers: { Authorization: ongId }};
      const {data} = await api.get('/profile', header);
      setIncidents(oldData=> data);
      console.log(data);
    };

    getData();
  }, []);

  const handleDeleteIncident = async (idIncident:string) =>{
    try {
      const header = {headers: { Authorization: ongId }}
      const response = await api.delete(`/incidents/${idIncident}`, header)

      setIncidents(incidents.filter(incident=> incident.id !== idIncident))

      toast.success(response.data.message);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.message);
    }
  }

  const handleLogout = () =>{
    localStorage.clear()
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logo} alt="logo"/>
        <span>Bem Vinda, {ongName}</span>

        <Link className="button" to="incidents/new">
          Cadastrar novo caso
        </Link>
        <button 
          onClick={()=> handleLogout()}
          type="button">
          <FiPower size={18} color="#e02041"/>
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map((incident:PropsIncident) => {
          return(
            <li key={incident.id}>
              <strong>Caso:</strong>
              <p>{incident.title}</p>
              <strong>Descricao:</strong>
              <p>{incident.description}</p>
              <strong>Valor:</strong>
              <p>
                {Intl.NumberFormat(
                    'pt-BR',
                    {
                      style:'currency', 
                      currency: 'BRL'
                    }
                  ).format(incident.value)
                }
              </p>

              <button 
                type="button" 
                onClick={() => handleDeleteIncident(incident.id)}
              >
                <FiTrash2 size={20} color="#a8a8b3"/>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default Profile
