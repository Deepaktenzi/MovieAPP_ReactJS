import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', () => {
  const fetchData = Axios.get(
    'https://movieapi-ka6t.onrender.com/api/getmovies'
  ).then((res) => res.data.data);
  return fetchData;
});

const movieSlice = createSlice({
  name: 'movie',
  initialState: { movies: [], loading: false, error: '' },

  reducers: {
    searchItem: (state, action) => {
      const { searchTerm, orignalMovies } = action.payload;
      if (searchTerm) {
        // Filter the movies array based on the search term
        state.movies = state.movies.filter((movie) =>
          movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        // Reset the movies state to the full list
        state.movies = orignalMovies;
      }
    },
    sortMovies: (state) => {
      const sortedMovies = [...state.movies].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      state.movies = sortedMovies;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.error = '';
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.rejected = action.error.message;
      });
  },
});
export const { searchItem, sortMovies } = movieSlice.actions;
export default movieSlice.reducer;
