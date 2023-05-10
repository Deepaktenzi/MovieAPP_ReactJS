import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addId } from './utils/movieByIdSlice';
import Axios from 'axios';
function DashMovieItems({ name, thumbnail, _id }) {
  const dispatch = useDispatch();
  const deleteMovie = async () => {
    console.log('Button call');
    await Axios.delete('https://movieapi-ka6t.onrender.com/api/deletemovie/', {
      params: {
        id: _id.toString(),
      },
    });
    alert('Movie Deleted Successfully!');
    window.location.reload();
  };
  return (
    <>
      <div className="conatiner">
        <div className="row mt-1 dash_items">
          <div className="col-lg-3 ">{name}</div>
          <div className="col-lg-3">
            <img src={thumbnail} className="w-50" alt="thumbnail" />
          </div>
          <div className="col-lg-3">
            <Link
              className="btn btn-primary"
              onClick={() => dispatch(addId(_id))}
              to={`/dashboard/edit`}
            >
              Edit
            </Link>
          </div>
          <div className="col-lg-3">
            <button className="btn btn-primary" onClick={() => deleteMovie()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashMovieItems;
