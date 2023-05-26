import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
    name: 'team',
    initialState: {
      value: localStorage.getItem('team') || '',
    },
    reducers: {
      setTeam: (state, action) => {
        state.value = action.payload;
        localStorage.setItem('team', action.payload);
      },
    },
  });
  
  export const { setTeam } = teamSlice.actions;
  export default teamSlice.reducer;