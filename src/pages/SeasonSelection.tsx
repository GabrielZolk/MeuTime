import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';
import { useNavigate, useLocation } from 'react-router-dom';
import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/SeasonSelection.css';
import { setSeason } from '../redux/seasonSlice';
import Header from '../components/Header';

type Season = {
  season: number;
};

export default function SeasonSelection() {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const isLogged = useSelector((state: RootState) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = String(localStorage.getItem('key'));

  const location = useLocation();

  async function getData() {
    try {
      const api = createAPI(key);
      const { data } = await api.get(`/leagues/seasons`);
      if (data && data.response && data.response.length > 0) {
        setSeasons(data.response.map((item: Season) => ({ season: item })));
      } else {
        setError('There was no response from the API. Please check your key and try again.');
      }
    } catch (error) {
      setError('Error loading seasons. Please check your connection and try again.');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, [key]);

  useEffect(() => {
    if (location.state?.from === '/leagues') {
      getData();
    }
  }, [location]);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    const selectedSeason = event.currentTarget.textContent;
    dispatch(setSeason(selectedSeason));
    navigate('/leagues');
  }

  if (!isLogged) {
    return <NotAuthorized />;
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <Header children={key} />
      <div className="season-container">
        <h1>Select Season</h1>
        <div className="season-box">
          {seasons.map((season: Season, index) => (
            <div onClick={handleClick} className="season" key={index}>
              <h4>{season.season}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
