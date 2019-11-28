import React, { useState } from "react";
import MovieBox from "./MovieBox"

export default function PickFav(props) {
  const [movie, setMovie] = useState(0)

  return (
    <div>
      <main className="favSelector">
        <div onClick={() => setMovie(prev => prev === 0 ? prev : prev - 1)}>Left</div>
        <MovieBox img = {props.searchedMovie[movie].poster} title = {props.searchedMovie[movie].title}/>
        <div onClick={() => setMovie(prev => prev === props.searchedMovie.length - 1 ? prev : prev + 1)}>Right</div>
      </main>
      <button onClick={()=>{props.saveToFavoriteList(props.user.name, props.searchedMovie[movie])}}>Yes, this one!</button>
    </div>
  );
}