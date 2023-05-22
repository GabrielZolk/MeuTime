import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        value: ''
    },
    reducers: {
      setCountry: (state, action) => {
        state.value = action.payload;
      },
    },
  });
  
  export const { setCountry } = countrySlice.actions;
  export default countrySlice.reducer;