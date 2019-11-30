import React from "react";

export default function PickFav(props) {

  return (
    <div>
      <main className="favSelector">
        <div onClick={() => props.setMovie(prev => prev === 0 ? prev : prev - 1)}>Left</div>
        <img src={props.searchedMovie[props.movie].poster} alt={props.searchedMovie[props.movie].title} height='200px'></img>
        <h5>{props.searchedMovie[props.movie].title}</h5>
        <h6>{props.searchedMovie[props.movie].release_date}</h6>
        <div onClick={() => props.setMovie(prev => prev === props.searchedMovie.length - 1 ? prev : prev + 1)}>Right</div>
      </main>
      <button onClick={()=>{props.saveToFavoriteList(props.user.name, props.searchedMovie[props.movie]); props.close()}}>Yes, this one!</button>
    </div>
  );
}