import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Suggested(props) {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieReleaseDate, setMovieReleaseDate] = useState("");

  const newMovie = () => {
    axios.get("http://localhost:5000/")
      .then(response => {
        setMovieTitle(response.data.title);
        setMovieDescription(response.data.description);
        setMoviePoster(response.data.poster);
        setMovieReleaseDate(response.data.release_date);
      })
  }

  return (
    <section>
      <img src={moviePoster} height="200px"></img>
      <h2>{movieTitle}</h2>
      <h4>{movieReleaseDate}</h4>
      <p>{movieDescription}</p>
      <button type="button" onClick={()=> newMovie()}>Suggest a Movie</button>
    </section>
  );
}