import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { fetchMovies } from './utils/moviesSlice';
import DashMovieItems from '../Components/DashMovieItems';
const MoviesDash = () => {
  const dispatch = useDispatch();
  const movie = useSelector((store) => store.movie);
  const [moviesList, setMoviesList] = useState();
  useEffect(() => {
    dispatch(fetchMovies());
  }, []);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await Axios.get('http://localhost:4000/api/getmovies').then((res) =>
      setMoviesList(res.data.data)
    );
  };

  return movie.loading ? (
    <h3>Loading...</h3>
  ) : (
    <div className="container ">
      {movie.movies.map((val) => {
        return <DashMovieItems {...val} />;
      })}
    </div>
  );
};

export default MoviesDash;
