import React from 'react';
import { Link } from 'react-router-dom';
function MovieCard({ name, thumbnail, description }) {
  return (
    <div className="moviecard">
      <img src={thumbnail} alt="" srcset="" />
      <div className="title">{name}</div>
      <div className="summary">Summary</div>
      <div className="desc">{description}</div>
      <div className="watch">
        <Link> WATCH TRAILER</Link>
      </div>
    </div>
  );
}

export default MovieCard;
