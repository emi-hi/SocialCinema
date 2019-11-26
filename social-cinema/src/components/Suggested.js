import React, { useState } from "react";
import axios from "axios";
import './App.css';

export default function Suggested() {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieReleaseDate, setMovieReleaseDate] = useState("");
  const [suggested, setSuggested] = useState("hide")

  const newMovie = () => {
    axios.get("http://localhost:5000/suggestion")
      .then(response => {
        setMovieTitle(response.data.title);
        setMovieDescription(response.data.description);
        setMoviePoster(response.data.poster);
        setMovieReleaseDate(response.data.release_date);
      })
  }

  return (
    <section>
      {suggested === "hide" &&
        <div className="click-suggest" onClick={() => {
          setSuggested("show")
          newMovie()
        }}>
          <img src="images/filmreel.png" height="300px" alt="click to generate a suggestion!"/>
          <h1>Click to Generate Your First Movie Suggestion</h1>
        </div>
      }
      {suggested === "show" && 
        <div>
      
          <div className="suggestion-all">
            <img alt={movieTitle} src={moviePoster} className="poster"></img>
            <div className="suggestion-text">
              <h2 className="movie-title">{movieTitle}</h2>
              <h4>{movieReleaseDate.slice(0,4)}</h4>
              <p>{movieDescription}</p> 
            </div>
          </div>
          <div className="suggestion-buttons">
            <button type="button" onClick={()=>console.log("add this movie to later list!")}>Add This to Later List</button>
            <button type="button" onClick={()=> newMovie()}>Suggest a Different Movie</button>
          </div>
        </div>
      }

    </section>
  );
}