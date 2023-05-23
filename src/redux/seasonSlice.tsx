import { createSlice } from '@reduxjs/toolkit';

const seasonSlice = createSlice({
    name: 'season',
    initialState: {
      value: localStorage.getItem('season') || '',
    },
    reducers: {
      setSeason: (state, action) => {
        state.value = action.payload;
        localStorage.setItem('season', action.payload);
      },
    },
  });
  
  export const { setSeason } = seasonSlice.actions;
  export default seasonSlice.reducer;