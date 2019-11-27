import React from "react";

export default function Genre(props) {

  return (
    <div className="genre">
      <img src={`images/genreicons/${props.name}.svg`} height='50px'/>
      <h4>{props.name}</h4>
      <button type="button" className={props.love_class} onClick={() => props.setGenre(props.id, true)}>Love it!</button>
      <button type="button" className={props.meh_class} onClick={() => props.setGenre(props.id, "")}>Meh</button>
      <button type="button" className={props.hate_class} onClick={() => props.setGenre(props.id, false)}>Hate it!</button>
    </div>
  )
}
