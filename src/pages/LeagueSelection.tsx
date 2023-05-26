import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';
import { useNavigate } from 'react-router-dom';
import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/LeagueSelection.css'
import { setLeague } from '../redux/leagueSlice';

type League = {
  name: string;
  logo: string;
  id: number;
};



export default function LeagueSelection() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLogged = useSelector((state: RootState) => state.login);
  const country = useSelector((state: RootState) => state.country.value);
  const season = useSelector((state: RootState) => state.season.value);
  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = String(localStorage.getItem('key'));

  useEffect(() => {
  async function getData() {
    const api = createAPI(key);
    const { data } = await api.get(`/leagues?country=${country}&season=${season}`);
    if (data) {
      console.log(data)
      console.log(data.response)
      const leagues = data.response.map((item: any) => ({
        name: item.league.name,
        logo: item.league.logo,
        id: item.league.id,
      }));
      
      
      setLeagues(leagues);
      console.log(leagues)
    }
    setIsLoading(false);
  }

    getData()
  }, []);

  function handleClick(event: any) {
    const clickedElement = event.target;
  
    if (clickedElement.tagName === 'IMG') {
      const selectedLeague = clickedElement.alt;
      const leagueObject = leagues.find((league) => league.name === selectedLeague);
  
      if (leagueObject) {
        const selectedLeagueId = leagueObject.id;
        dispatch(setLeague(selectedLeagueId));
        navigate('/teams');
      }
    }
  
    if (clickedElement.tagName === 'H4') {
      const selectedLeague = clickedElement.textContent;
      const leagueObject = leagues.find((league) => league.name === selectedLeague);
  
      if (leagueObject) {
        const selectedLeagueId = leagueObject.id;
        dispatch(setLeague(selectedLeagueId));
        navigate('/teams');
      }
    }
  }
  
  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    isLogged ? (
      <div className='leagues-container'>
        <h1>Select League</h1>
        <div className='leagues-box'>
          {leagues.length !== 0 ? (
            leagues.map((league: any, index) => (
              <div onClick={handleClick} className='league' key={index}>
                <img src={league.logo} alt={league.name} />
                <h4>{league.name}</h4>
              </div>
            ))
          ) : (
            <div>
            <h4>Não há ligas disponíveis no período selecionado.</h4>
            <h4>Por favor, selecione outra temporada</h4>
            <button onClick={() => window.history.back()}>Voltar para seleção de período</button>
            </div>
          )}
        </div>
      </div>
    ) : (
      <NotAuthorized />
    )
  );
}
