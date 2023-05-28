import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';
import { useNavigate, useLocation } from 'react-router-dom';
import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/LeagueSelection.css'
import { setLeague } from '../redux/leagueSlice';
import Header from '../components/Header';

type League = {
  name: string;
  logo: string;
  id: number;
};

export default function LeagueSelection() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const isLogged = useSelector((state: RootState) => state.login);
  const country = useSelector((state: RootState) => state.country.value);
  const season = useSelector((state: RootState) => state.season.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = String(localStorage.getItem('key'));

  const location = useLocation();

  async function getData() {
    try {
      const api = createAPI(key);
      const { data } = await api.get(`/leagues?country=${country}&season=${season}`);

      if (data && data.response && data.response.length > 0) {
        const leagues = data.response.map((item: any) => ({
          name: item.league.name,
          logo: item.league.logo,
          id: item.league.id,
        }));

        setLeagues(leagues);
      } else {
        setError('There was no response from the API. Please check your key and try again.');
      }
    } catch (error) {
      setError('Error loading leagues. Please check your connection and try again.');
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (location.state?.from === '/teams') {
      getData();
    }
  }, [location]);

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
      <div className='leagues-container'>
        <h1>Select League</h1>
        {leagues.length !== 0 ? (
          <div className='leagues-box'>
            {leagues.map((league: any, index) => (
              <div onClick={handleClick} className='league' key={index}>
                <img src={league.logo} alt={league.name} />
                <h4>{league.name}</h4>
              </div>
            ))}
          </div>
        ) : (
          <div className='no-available'>
            <h4>There are no leagues available in the selected period.</h4>
            <h4>Please select another season.</h4>
            <button onClick={() => window.history.back()}>Return to period selection.</button>
          </div>
        )}
      </div>
    </div>
  );
}
