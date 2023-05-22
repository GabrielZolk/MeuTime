import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import createAPI from '../services/api';

import './styles/Login.css';

import { logged } from '../redux/loginSlice';


export default function Login() {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginResolver = logged()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const api = createAPI(inputValue);
    api
      .get('/timezone')
      .then((response) => {
        if (response.data.response.length !== 0) {
            localStorage.setItem('key', inputValue)
            dispatch(loginResolver);
            navigate('/country');
            setLoading(false);
        } else {
            setResponse(response.data.response.length)
            setLoading(false);
        }
        
      })
      .catch((error) => {
        console.error(error);
      });
  
    setInputValue('');
  };


  return (
    <div className="container">
      <div className="container-box">
        <h1>Insira sua API-KEY para fazer Login</h1>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <span className={response === 0 ? 'validate visible' : 'validate'}>
            Chave incorreta ou inválida
          </span>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Api-Key Here!"
            value={inputValue}
            onChange={handleInputChange}
            className={response === 0 ? 'validation' : ''}
          />
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
