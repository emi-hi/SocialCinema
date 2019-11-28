import React from "react";
import RecentMovieListItem from './RecentMovieListItem'

export default function RecentSuggestion(props) {
  console.log(props.recent)
  let recents = props.recent.map((movie) => {
    return <RecentMovieListItem title={movie["newSuggestion"]}/>
  })


  return (
    <article className="test">
      <div>
       {recents}
      </div>
    </article>
    )
}


