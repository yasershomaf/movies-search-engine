import React from 'react';
import './Card.css';

export default function Card({details}) {
  return <div className="card">
    <img
      src={
        details.backdropPaths.w300 ||
        details.posterPaths.w342 ||
        'https://media.comicbook.com/files/img/default-movie.png'
      }
      alt={`${details.title || details.name} poster`}
      className="poster"
    />

    {details.vote_average > 0 && <div className="rating">{details.vote_average}</div>}

    <h2 className="title">{details.title || details.name}</h2>

    {details.release_date && <h3 className="release-year">{details.release_date}</h3>}

    <p className="overview">{details.overview}</p>
  </div>;
};
