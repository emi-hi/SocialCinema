import React from "react";
import { Droppable } from 'react-beautiful-dnd'

import RecentMovieListItem from './RecentMovieListItem'

export default function RecentSuggestion(props) {
  let recents = props.recent.map((movie, index) => {
    console.log(movie);
    return <RecentMovieListItem key={index} id={movie.newSuggestion.tmdb_id} description={movie.newSuggestion.description} index={index} title={movie.newSuggestion.title} img={movie.newSuggestion.poster} imdb_link={movie.newSuggestion.imdb_link}/>
  })

  return (
    <Droppable droppableId={props.id} type={props.type} >
    {(provided) => (
      <section 
        ref={provided.innerRef}
        {...provided.droppableProps}
      > 
        {recents.length>0? <h4 className="mobile-title">Recent Suggestions</h4> : ""}
        <aside className="recent-suggestion-list-container">
          {recents.length>0? <h4 className="computer-title">Recent Suggestions</h4> : ""}
          {recents}
          {provided.placeholder}
        </aside>
      </section>
    )}
    </Droppable>
    )
}
