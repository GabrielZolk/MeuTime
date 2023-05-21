import axios from 'axios';

const createAPI = (apiKey: string) => {
  const api = axios.create({
    baseURL: 'https://v3.football.api-sports.io/',
    headers: {
      'x-apisports-key': apiKey,
    },
  });

  return api;
};

export default createAPI;
