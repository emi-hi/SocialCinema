import React from "react";

export default function Genre(props) {

  return (
    <div class="genre">
      <h4>{props.name}</h4>
      <button type="button" class={props.love_class} onClick={()=>{console.log("LOVE")}}>Love it!</button>
      <button type="button" class={props.meh_class} onClick={()=>{console.log("meh")}}>Meh</button>
      <button type="button" class={props.hate_class} onClick={()=>{console.log("HATE")}}>Hate it!</button>
    </div>
  )
}
