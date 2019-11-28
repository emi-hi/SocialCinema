import React, { useState } from "react";
import axios from "axios";
import './App.css';

export default function Suggested(props) {
  const [suggestedMovie, setSuggestedMovie] = useState("");
  const [suggested, setSuggested] = useState("hide")

  const newMovie = () => {
    console.log(props.group)
    axios.post(`http://localhost:5000/suggestion`, { userGenrePreferences: props.userGenres, group: props.group })
      .then(response => {
        setSuggestedMovie({
          "title": response.data.title,
          "description": response.data.description,
          "poster": response.data.poster,
          "releaseDate": response.data.release_date,
          "tmdbId": response.data.tmdb_id
        });
        props.getRecentSuggestions(response.data);
      })
  }

  const saveToLaterList = (userName, suggestedMovie) => {
    axios.post(`http://localhost:5000/api/${userName}/latermovies`, { suggestedMovie })
    .then(response => {
      props.setLaterMovies(response.data.later_movies)
    })
  }

  return (
    <section>
      {suggested === "hide" &&
        <div className="click-suggest" onClick={() => {
          setSuggested("show")
          newMovie()
        }}>
          <img src="images/film-reel.png" height="300px" alt="click to generate a suggestion!"/>
          <h1>{props.user.name}</h1>
          <h1>Click to Generate Your First Movie Suggestion</h1>
        </div>
      }
      {suggested === "show" && 
        <div>
          <div className="suggestion-all">
            <img alt={suggestedMovie.title} src={suggestedMovie.poster} className="poster"></img>
            <div className="suggestion-text">
              <h2 className="movie-title">{suggestedMovie.title}</h2>
              <h4>{suggestedMovie.releaseDate }</h4>
              <p>{suggestedMovie.description}</p> 
            </div>
          </div>
          <div className="suggestion-buttons">
            {props.user.name && <button type="button" onClick={()=>{saveToLaterList(props.user.name, suggestedMovie)}}>Add This to Later List</button>}
            <button type="button" onClick={()=>newMovie(props.userGenres)}>Suggest a Different Movie</button>
          </div>
        </div>
      }

    </section>
  );
}