import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { useNavigate } from 'react-router-dom';
import NotAuthorized from '../components/NotAuthorized';

import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/CountrySelection.css'
import { setCountry } from '../redux/countrySlice';

type Country = {
  name: string;
  flag: string;
}

export default function CountrySelection() {
  const [countries, setCountries] = useState<Country[]>([]);

  const isLogged = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const key = String(localStorage.getItem('key'));

  async function getData() {
    const api = createAPI(key);
    const { data } = await api.get('/countries')
    if (data) {
      const country = data.response.map(({ name, flag }: Country) => ({ name, flag }));
      setCountries(country)
      console.log(country)
    }
  }

  useEffect(() => {
    getData()
  }, []);

  function handleClick(event: any) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG') {
      const selectedCountry = clickedElement.alt;
      dispatch(setCountry(selectedCountry));
      navigate('/leagues');
    }
  
    if (clickedElement.tagName === 'H4') {
      const selectedCountry = clickedElement.textContent;
      dispatch(setCountry(selectedCountry));
      navigate('/leagues');
    }
  }

  return (
    isLogged ? (
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
    ) : (
      <NotAuthorized />
    )
  );
}
