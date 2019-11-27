import React, {useState} from "react";
import axios from 'axios';

import MovieBox from './MovieBox'


export default function FavoriteForm(props) {
  const [title, setTitle] = useState("");
  const [searchedMovie, setSearchedMovie] = useState("");

  const movieSearch = (event) => {
    event.preventDefault();
    const queryStringTitle = title.trim().split(" ").join("%20"); 
  
    axios.get(`http://localhost:5000/movies/title/?title=${queryStringTitle}`)
    .then(response => {
      setSearchedMovie(response.data)
    })
  }

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
  
      {searchedMovie && <MovieBox img = {searchedMovie.poster} title = {searchedMovie.title}/>}
      {searchedMovie && <button onClick={()=>{console.log("Send to DB!")}}>Yes, this one!</button>}
    </main>
  )
}
