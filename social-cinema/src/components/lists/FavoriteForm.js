import React, {useState} from "react";
import axios from 'axios';

import PickFav from "./PickFav";


export default function FavoriteForm(props) {
  const [title, setTitle] = useState("");
  const [searchedMovie, setSearchedMovie] = useState("");
  const [error, setError] = useState(false);
  const [movie, setMovie] = useState(0)


  const saveToFavoriteList = (userName, movie) => {
    axios.post(`http://localhost:5000/api/${userName}/favmovies`, { movie })
    .then(response => {
      props.setFavoriteMovies(response.data.favorited_movies)
    })
    .catch(error => {console.log(error)})
  };

  const movieSearch = (event) => {
    event.preventDefault();
    const queryStringTitle = title.trim().split(" ").join("%20"); 
  
    axios.get(`http://localhost:5000/movies/title/?title=${queryStringTitle}`)
    .then(response => {
      setMovie(0);
      if (response.data.movies) {
        setError(false);
        setSearchedMovie(response.data.movies)
      } else {
        setSearchedMovie("");
        setError(true);
      }
    })
    .catch(error => {console.log(error)})
  };

  return(
    <main className="favorite-form">
      <h3>Add a New Favorite</h3>
      <form onSubmit={movieSearch}>
        <label>
          Movie Title:
          <input 
            type="text" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <input type="submit" value="Search"/>
      </form>
      <br/>
      {error && <p>Your search returned no results.</p>}
      {searchedMovie && <PickFav user={props.user} searchedMovie={searchedMovie} saveToFavoriteList={saveToFavoriteList} movie={movie} setMovie={setMovie} />}
    </main>
  )
}
