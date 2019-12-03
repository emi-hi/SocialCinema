import React from "react";
import MovieBox from "./lists/MovieBox"

export default function RecentMovieListItem(props) {
  return (
    <div className="recent-movie-display">
      <MovieBox id={props.id} index={props.index} title={props.title} img={props.img} description={props.description} />
      {/* <a href={props.imdb_link} target="_blank">{props.title}</a> */}
    </div>
  );
}