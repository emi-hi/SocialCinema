import React from "react";
import { Droppable } from 'react-beautiful-dnd'

import RecentMovieListItem from './RecentMovieListItem'

export default function RecentSuggestion(props) {
  let recents = props.recent.map((movie, index) => {
    return <RecentMovieListItem key={index} id={movie.newSuggestion.tmdb_id} index={index} title={movie.newSuggestion.title} img={movie.newSuggestion.poster} imdb_link={movie.newSuggestion.imdb_link}/>
  })

  return (
    <Droppable droppableId={props.id} type={props.type} >
    {(provided) => (
      <aside className="recent recent-suggestion-list-container"
        ref={provided.innerRef}
        {...provided.droppableProps}
      > 
        {recents.length>0? <h4>Recent Suggestions</h4> : ""}
        {recents}
        {provided.placeholder}
      </aside>
    )}
    </Droppable>
    )
}
