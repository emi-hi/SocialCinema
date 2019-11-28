import React from "react";
import RecentMovieListItem from './RecentMovieListItem'

export default function RecentSuggestion(props) {
  let recents = props.recent.map((movie) => {
    return <RecentMovieListItem title={movie.newSuggestion.title}/>
  })

  return (
    <article className="test">
      <div>
       {recents}
      </div>
    </article>
    )
}
