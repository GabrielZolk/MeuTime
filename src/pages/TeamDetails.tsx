import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import NotAuthorized from '../components/NotAuthorized';

import createAPI from '../services/api';
import { useEffect, useState } from 'react';

import './styles/TeamDetails.css'
import Header from '../components/Header';

type Team = {
    loses: number,
    draws: number,
    played: number,
    wins: number
};

export default function TeamDetails() {
    const [teamPlayers, setTeamPlayers] = useState<Team[]>([]);
    const [teamStats, setTeamStats] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const isLogged = useSelector((state: RootState) => state.login);
    const team = useSelector((state: RootState) => state.team.value);
    const season = useSelector((state: RootState) => state.season.value);
    const league = useSelector((state: RootState) => state.league.value);

    const key = String(localStorage.getItem('key'));

    useEffect(() => {
        async function getData() {
            try {
                const api = createAPI(key);
                const { data } = await api.get(`/players?season=${season}&league=${league}&team=${team}`);
                if (data) {
                    const stats = data.response.map((item: any) => ({
                        name: item.player.name,
                        age: item.player.age,
                        nationality: item.player.nationality,
                        photo: item.player.photo,
                    }));
                    setTeamPlayers(stats);
                } else {
                    setError('There was no response from the API. Please check your key and try again.');
                }
            } catch (error) {
                setError('Error loading players. Please check your connection and try again.');
            } 
        }

        getData();
    }, []);

    useEffect(() => {
        async function getData() {
            const api = createAPI(key);
            const { data } = await api.get(`/teams/statistics?season=${season}&league=${league}&team=${team}`);
            if (data) {
                const { loses, draws, played, wins } = data.response.fixtures;
                const stats = {
                    loses: loses.total,
                    draws: draws.total,
                    played: played.total,
                    wins: wins.total
                };
                setTeamStats([stats]);
            }
        }
        getData()
    }, []);



    useEffect(() => {
        async function getData() {
            const api = createAPI(key);
            const { data } = await api.get(`/teams/statistics?season=${season}&league=${league}&team=${team}`);
            if (data) {
                const minutesData = data.response.goals.for.minute;
                const labels = Object.keys(minutesData);
                const dataValues = Object.values(minutesData).map((minute: any) => minute.total);
                const percentage = Object.values(minutesData).map((percentage: any) => percentage.percentage);
                const canvas = document.getElementById('goals-chart') as HTMLCanvasElement;
                const context = canvas.getContext('2d') as CanvasRenderingContext2D;

                const chartHeight = 300;
                const barWidth = 40;
                const barSpacing = 20;
                const maxDataValue = Math.max(...dataValues);

                canvas.width = (barWidth + barSpacing) * labels.length;
                canvas.height = 400;

                context.fillStyle = 'white';
                context.strokeStyle = 'rgba(39, 146, 214, 1)';
                context.lineWidth = 1;

                const yOffset = 50;
                const xOffset = 15;

                for (let i = 0; i < labels.length; i++) {
                    const barHeight = (dataValues[i] / maxDataValue) * chartHeight;

                    const x = (barWidth + barSpacing) * i + xOffset;
                    const y = chartHeight - barHeight + yOffset;

                    context.fillRect(x, y, barWidth, barHeight);
                    context.strokeRect(x, y, barWidth, barHeight);

                    const percentageText = `${percentage[i]}`;
                    const labelText = `${labels[i]}`;

                    context.fillStyle = 'white';
                    context.font = '12px Arial';
                    context.textAlign = 'center';

                    const textWidth = context.measureText(labelText).width;

                    context.fillText(percentageText, x + barWidth / 2, y - 5);

                    context.fillText(labelText, x + barWidth / 1 - textWidth / 2, chartHeight + 65);
                }
            }
            
        }
        getData();
        setIsLoading(false);
    }, []);

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
            <div className="stats-container">
                <h1>Team Stats</h1>
                <div className="stats-box">
                    <div className="players-box">
                        <h4>Players: Name, Age, Nationality</h4>
                        <div className="player-cards">
                            {teamPlayers.map((player: any, index) => (
                                <div className="player-card" key={index}>
                                    <img src={player.photo} alt={player.name} />
                                    <div className="field">
                                        <p>{player.name}</p>
                                    </div>
                                    <div className="field">
                                        <p>{player.age}</p>
                                    </div>
                                    <div className="field">
                                        <p>{player.nationality}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="team-stats">
                        <h4>Stats: Played, Wins, Loses, Draws</h4>
                        <table className="stats-table">
                            <thead>
                                <tr>
                                    <th>Played</th>
                                    <th>Wins</th>
                                    <th>Loses</th>
                                    <th>Draws</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamStats.map((stats: any, index) => (
                                    <tr key={index} className="stats">
                                        <td>{stats.played}</td>
                                        <td>{stats.wins}</td>
                                        <td>{stats.loses}</td>
                                        <td>{stats.draws}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="chart-container">
                        <h4>Goal by Time</h4>
                        <div className="goals-chart">
                            <canvas id="goals-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
