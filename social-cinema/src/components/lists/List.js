import React from "react";
import MovieBox from "./MovieBox"
import Empty from "./Empty"
import AddFav from "./AddFav"

export default function List(props) {
  let boxes = [];
  for (let x = 0; x < 10; x++) {
    if (props.data.length > x) { 
      boxes.push(<MovieBox title={props.data[x]['title']} img={props.data[x]['img']} />)
    } else {
      if (props.type === 'favorites') {
        boxes.push(<AddFav/>)
      } else {
        boxes.push(<Empty/>)
      }
    }
  } 
  return (
    <article className="list">{boxes}</article>
  )
}