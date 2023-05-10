import { createSlice } from '@reduxjs/toolkit';

const movieByIdSlice = createSlice({
  name: 'movieid',
  initialState: {
    id: '',
  },
  reducers: {
    addId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { addId } = movieByIdSlice.actions;

export default movieByIdSlice.reducer;
