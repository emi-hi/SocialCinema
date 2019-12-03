import React from "react";
import { Droppable } from 'react-beautiful-dnd'

import MovieBox from "./MovieBox"
import Empty from "./Empty"
import AddFav from "./AddFav"

import "./styles.scss"

export default function List(props) {
  let boxes = [];
  const listName = props.type==="favorites"? "Favorite Movies" : "Movies to Watch Later"
  for (let x = 0; x < props.data.length; x++) {
    if (props.data.length > x) {
      console.log("MB", props.data[x])
      boxes.push(<MovieBox key={props.data[x]['id']} id={props.data[x]['id']} index={x} title={props.data[x]['title']} description={props.data[x]['description']} img={props.data[x]['img']} removeLaterMovie={props.removeLaterMovie} />)
    } else {
    }
  } 
  if (props.data.length < 10 && props.type === 'favorites') {
    
    boxes.push(<AddFav key={-1} user={props.user} setFavoriteMovies={props.setFavoriteMovies}/>)
  } else if (props.data.length === 0) {
    boxes.push(<Empty key={-1} />)
  }
  return (
    <>
    <h4>{listName}</h4>
    <Droppable droppableId={props.type} type={props.type} direction="horizontal">
      {(provided) => (
        <section
          className="list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {boxes}
          {provided.placeholder}
        </section>
      )}
    </Droppable>
    </>
  )
}