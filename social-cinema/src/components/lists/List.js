import React from "react";
import MovieBox from "./MovieBox"
import Empty from "./Empty"
import AddFav from "./AddFav"

import "./styles.css"

export default function List(props) {
  let boxes = [];

  for (let x = 0; x < props.data.length; x++) {
    if (props.data.length > x) { 
      boxes.push(<MovieBox key={props.data[x]['id']} id={props.data[x]['id']} title={props.data[x]['title']} img={props.data[x]['img']} removeLaterMovie={props.removeLaterMovie} />)
    } else {
    }
  } 
  if (props.data.length < 10 && props.type === 'favorites') {
    boxes.push(<AddFav key={-1} user={props.user} setFavoriteMovies={props.setFavoriteMovies}/>)
  } else if (props.data.length === 0) {
    boxes.push(<Empty key={-1} />)
  }
  return (
    <article className="list">{boxes}</article>
  )
}