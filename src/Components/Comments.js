import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getroot } from './utils/authSlice';
function Comments({ data, movieId }) {
  const [editShow, seteditShow] = useState(false);
  const [comment, setComment] = useState();
  const storeRootUser = useSelector((store) => store.auth.rootUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getroot());
  }, [dispatch]);

  const postEditComment = async (id) => {
    console.log('Comment Id', id);
    console.log('Movie Id', movieId);
    await Axios.put(
      'https://movieapi-ka6t.onrender.com/api/editcoment',
      { comment, movieId: movieId, commentId: id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    ).then((res) => console.log(res.data));
    window.alert('Comment Edited');
    window.location.reload();
  };

  const renderEditButton = () => {
    if (storeRootUser === data.postedBy) {
      if (editShow) {
        return (
          <div className="comment-edit">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Edit comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary"
              onClick={() => postEditComment(data._id)}
            >
              Save
            </button>
          </div>
        );
      } else {
        return (
          <button
            className="btn btn-primary"
            onClick={() => seteditShow(!editShow)}
          >
            Edit
          </button>
        );
      }
    }
    return null;
  };

  return (
    <>
      <div className="comment mt-3">
        <div className="comment-header">
          <h5 className="comment-user">{data.postedBy}</h5>
        </div>
        <div className="comment-body">
          <p className="comment-text">{data.text}</p>
          {renderEditButton()}
        </div>
      </div>
    </>
  );
}

export default Comments;
