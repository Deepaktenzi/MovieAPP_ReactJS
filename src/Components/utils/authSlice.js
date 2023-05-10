import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    rootId: '',
    rootUser: '',
    token: '',
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { token, rootId, rootUser } = action.payload;
      state.token = token;
      state.rootId = rootId;
      state.rootUser = rootUser;
      localStorage.setItem('rootUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('rootUser');
      return {};
    },
    getroot: (state) => {
      const jsonString = localStorage.getItem('rootUser');
      const data = JSON.parse(jsonString);
      state.rootUser = data?.rootUser;
      state.rootId = data?.rootId;
    },
  },
});
export const { loginSuccess, logout, getroot } = authSlice.actions;
export default authSlice.reducer;
