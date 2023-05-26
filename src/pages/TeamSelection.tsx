import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';
import { useNavigate } from 'react-router-dom';
import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/TeamSelection.css'
import { setTeam } from '../redux/teamSlice';

type Team = {
  name: string;
  logo: string;
  id: number;
};


export default function TeamSelection() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isLogged = useSelector((state: RootState) => state.login);
  const country = useSelector((state: RootState) => state.country.value);
  const season = useSelector((state: RootState) => state.season.value);
  const league = useSelector((state: RootState) => state.league.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const key = String(localStorage.getItem('key'));

  useEffect(() => {
    async function getData() {
      const api = createAPI(key);
      const { data } = await api.get(`/teams?country=${country}&season=${season}&league=${league}`);
      if (data) {
        console.log(data)
        console.log(data.response)
        const team = data.response.map((item: any) => ({
          name: item.team.name,
          logo: item.team.logo,
          id: item.team.id,
        }));
        setTeams(team);
      }
      setIsLoading(false);
    }

    getData()
  }, []);

  function handleClick(event: any) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'IMG') {
      const selectedTeam = clickedElement.alt;
      const teamObject = teams.find((team) => team.name === selectedTeam);

      if (teamObject) {
        const selectedTeamId = teamObject.id;
        dispatch(setTeam(selectedTeamId));
        navigate('/team');
      }
    }

    if (clickedElement.tagName === 'H4') {
      const selectedTeam = clickedElement.textContent;
      const teamObject = teams.find((team) => team.name === selectedTeam);

      if (teamObject) {
        const selectedTeamId = teamObject.id;
        dispatch(setTeam(selectedTeamId));
        navigate('/team');
      }
    }
  }

  if (isLoading) {
    return <div className='loading'>Loading...</div>;
  }

  return (
    isLogged ? (
      <div className='team-container'>
        <h1>Select Team</h1>
        <div className='team-box'>
          {teams.map((team: any, index) => (
            <div onClick={handleClick} className='team' key={index}>
              <img src={team.logo} alt={team.name} />
              <h4>{team.name}</h4>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <NotAuthorized />
    )
  );
}
