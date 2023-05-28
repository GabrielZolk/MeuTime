import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { useNavigate, useLocation } from 'react-router-dom';
import NotAuthorized from '../components/NotAuthorized';

import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/CountrySelection.css'
import { setCountry } from '../redux/countrySlice';
import Header from '../components/Header';

type Country = {
  name: string;
  flag: string;
}

export default function CountrySelection() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const isLogged = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const key = String(localStorage.getItem('key'));

  async function getData() {
    try {
      const api = createAPI(key);
      const { data } = await api.get('/countries');
      if (data) {
        const country = data.response.map(({ name, flag }: Country) => ({ name, flag }));
        setCountries(country);
      } else {
        setError('There was no response from the API. Please check your key and try again.');
      }
      setIsLoading(false);
    } catch (error) {
      setError('Error loading Countries. Please check your connection and try again.');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (location.state?.from === '/seasons') {
      getData();
    }
  }, [location]);

  function handleClick(event: any) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG') {
      const selectedCountry = clickedElement.alt;
      dispatch(setCountry(selectedCountry));
      navigate('/seasons');
    }

    if (clickedElement.tagName === 'H4') {
      const selectedCountry = clickedElement.textContent;
      dispatch(setCountry(selectedCountry));
      navigate('/seasons');
    }
  }

  if (!isLogged) {
    return <NotAuthorized />;
  }

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error}</div>;
  }

  return (
    <div>
      <Header children={key} />
      <div className='countries-container'>
        <h1>Select country</h1>
        <div className='countries-box'>
          {countries.map((country: Country, index) => (
            <div onClick={handleClick} className='country' key={index}>
              <img src={country.flag} alt={country.name} />
              <h4>{country.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
