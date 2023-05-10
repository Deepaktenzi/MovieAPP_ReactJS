import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Axios from 'axios';
import Shimmer from './Shimmer';
import { object } from 'yup';
import Comments from './Comments';
function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [comments, setComments] = useState();
  const [newcomments, setNewComments] = useState();

  // const token = useSelector((store) => store.auth.token);
  const newToken = localStorage.getItem('token');
  useEffect(() => {
    fetchMovie();
  }, []);
  const fetchMovie = async () => {
    await Axios.get('http://localhost:4000/api/getsinglemovie', {
      params: { id: id },
      headers: {
        Authorization: newToken,
      },
    }).then((res) => {
      setMovie(res.data.data);
    });
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        await Axios.get(`http://localhost:4000/api/showComment`, {
          params: {
            movieId: id,
          },
        }).then((res) => {
          if (res.data) {
            setComments(res.data);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  const postComment = async () => {
    await Axios.put(
      'http://localhost:4000/api/addComment',
      { newcomments, movieId: id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    ).then((res) => console.log(res.data));
  };

  return !movie ? (
    <Shimmer />
  ) : (
    <div className="container">
      <div className="row mt-3">
        <div className="col-lg-8">
          <ReactPlayer
            width="100%"
            height="100%"
            controls
            url={movie.trailer}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="heading">{movie.name}</div>
          <div className="desc">{movie.description}</div>
          <form className="mt-3">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Leave a comment here..."
                onChange={(e) => setNewComments(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary w-100"
                onClick={() => postComment()}
              >
                Add Comment
              </button>
            </div>
          </form>
          {comments
            ? comments?.map((val) => {
                return (
                  <>
                    <Comments data={val} movieId={id} key={val._id} />
                  </>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
