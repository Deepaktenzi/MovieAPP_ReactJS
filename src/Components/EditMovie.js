import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import Edit from './Edit';
function EditMovie() {
  const [dataById, setDataById] = useState();
  const movieId = useSelector((store) => store.movieid.id);

  console.log('this is id ', movieId);
  useEffect(() => {
    fetctMovieById();
  }, []);
  const fetctMovieById = async () => {
    await Axios.get('https://movieapi-ka6t.onrender.com/api/getmoviebyid', {
      params: {
        id: movieId,
      },
    }).then((res) => {
      console.log(res.data);
      setDataById(res.data.data);
    });
  };
  return <Edit data={dataById} id={movieId} />;
}

export default EditMovie;
