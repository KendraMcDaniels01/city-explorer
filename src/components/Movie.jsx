import React from 'react';


const Movie = (props) => {
  return (
    <div className="movie">
      <h3>{props.title}</h3>
      <p>Release Date: {props.release}</p>
      <p>Overview: {props.overview}</p>
    </div>
  );
};

export default Movie;