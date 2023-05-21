import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('login') === 'true';

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logged: () => {
      localStorage.setItem('login', 'true');
      return true;
    },
    loggedOut: () => {
      localStorage.setItem('login', 'false');
      return false;
    },
  },
});

export const { logged, loggedOut } = loginSlice.actions;
export default loginSlice.reducer;
