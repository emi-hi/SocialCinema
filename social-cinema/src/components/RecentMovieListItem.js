import React from "react";

export default function RecentMovieListItem(props) {
  return (
    <div className="recent-movie-display">
       <a href={props.imdb_link} target="_blank">{props.title}</a>
    </div>
  );
}