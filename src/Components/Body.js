import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Shimmer from '../Components/Shimmer';
import MovieCard from './MovieCard';
import { fetchMovies, searchItem, sortMovies } from './utils/moviesSlice';
import { Link } from 'react-router-dom';
import Axios from 'axios';
const Body = () => {
  const dispatch = useDispatch();
  const movie = useSelector((store) => store.movie);
  const [moviesList, setMoviesList] = useState();
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await Axios.get('https://movieapi-ka6t.onrender.com/api/getmovies').then(
      (res) => setMoviesList(res.data.data)
    );
  };

  return movie.loading ? (
    <Shimmer />
  ) : (
    <div className="container ">
      <nav class="navbar navbar-light bg-light ">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control form-control-sm"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-button"
            onChange={(e) =>
              dispatch(
                searchItem({
                  searchTerm: e.target.value,
                  orignalMovies: moviesList,
                })
              )
            }
          />

          <button
            class="btn btn-primary btn-lg"
            type="button"
            onClick={() => dispatch(sortMovies())}
          >
            AtoZ
          </button>
        </div>
      </nav>

      <div className="movielist">
        {movie.movies.map((val) => {
          return (
            <Link to={'/movie/' + val._id} key={val._id}>
              <MovieCard {...val} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
