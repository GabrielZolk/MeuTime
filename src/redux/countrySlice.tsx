import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
    name: 'country',
    initialState: {
      value: localStorage.getItem('country') || '',
    },
    reducers: {
      setCountry: (state, action) => {
        state.value = action.payload;
        localStorage.setItem('country', action.payload);
      },
    },
  });
  
  export const { setCountry } = countrySlice.actions;
  export default countrySlice.reducer;