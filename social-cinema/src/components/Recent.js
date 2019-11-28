import React from "react";
import RecentMovieListItem from './RecentMovieListItem'

export default function RecentSuggestion(props) {
  console.log(props.recent)
  let recents = props.recent.map((movie) => {
    return <RecentMovieListItem title={movie.newSuggestion.title}/>
  })


  return (
    <article>
      <div className="recent"> 
       {recents}
      </div>
    </article>
    )
}
