import React from "react";

export default function Genre(props) {

  return (
    <div class="genre">
      <h4>{props.name}</h4>
      <button type="button" class={props.love_class} onClick={() => props.setGenre(props.id, true)}>Love it!</button>
      <button type="button" class={props.meh_class} onClick={() => props.setGenre(props.id, "")}>Meh</button>
      <button type="button" class={props.hate_class} onClick={() => props.setGenre(props.id, false)}>Hate it!</button>
    </div>
  )
}
