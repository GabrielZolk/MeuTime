import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';

import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/LeagueSelection.css'

type League = {
  league: {
    name: string;
    logo: string;
  };
};


export default function LeagueSelection() {
  const [leagues, setLeagues] = useState<League[]>([]);

  const isLogged = useSelector((state: RootState) => state.login);
  const country = useSelector((state: RootState) => state.country.value);
  const season = useSelector((state: RootState) => state.season.value);
  
  const key = String(localStorage.getItem('key'));

  useEffect(() => {
  async function getData() {
    const api = createAPI(key);
    const { data } = await api.get(`/leagues?country=${country}&season=${season}`);
    if (data) {
      const leagues = data.response.map((item: League) => ({
        name: item.league.name,
        logo: item.league.logo,
      }));
      setLeagues(leagues);
    }
  }

    getData()
  }, []);

  return (
    isLogged ? (
      <div className='leagues-container'>
        <h1>Select League</h1>
        <div className='leagues-box'>
          {leagues.map((league: any, index) => (
            <div className='league' key={index}>
              <img src={league.logo} alt={league.name} />
              <h4>{league.name}</h4>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <NotAuthorized />
    )
  );
}
