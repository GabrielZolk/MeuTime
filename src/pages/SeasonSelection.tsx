import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';
import { useNavigate } from 'react-router-dom';
import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/SeasonSelection.css'
import { setSeason } from '../redux/seasonSlice';

type Season = {
    season: number;
};


export default function SeasonSelection() {
  const [seasons, setSeasons] = useState<Season[]>([]);

  const isLogged = useSelector((state: RootState) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = String(localStorage.getItem('key'));

  useEffect(() => {
    async function getData() {
      const api = createAPI(key);
      const { data } = await api.get(`/leagues/seasons`);
      if (data) {
        const seasons = data.response.map((item: number) => item);
        setSeasons(seasons);
      }
    }
  
    getData();
  }, []);
  

  function handleClick(event: any) {
    const clickedElement = event.target;
    const selectedSeason = clickedElement.textContent
    dispatch(setSeason(selectedSeason));
    navigate('/leagues');
  }

  return (
    isLogged ? (
      <div className='season-container'>
        <h1>Select Season</h1>
        <div className='season-box'>
          {seasons.map((number: any, index) => (
            <div onClick={handleClick} className='season' key={index}>
              <h4>{number}</h4>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <NotAuthorized />
    )
  );
}


