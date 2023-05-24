import { createSlice } from '@reduxjs/toolkit';

const leagueSlice = createSlice({
    name: 'league',
    initialState: {
      value: localStorage.getItem('league') || '',
    },
    reducers: {
      setLeague: (state, action) => {
        state.value = action.payload;
        localStorage.setItem('league', action.payload);
      },
    },
  });
  
  export const { setLeague } = leagueSlice.actions;
  export default leagueSlice.reducer;