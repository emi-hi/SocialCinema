import React from "react";
import Empty from "./Empty"

export default function MovieBox(props) {
  return (
    <main className="movie_box">
       <img src={props.img} height="100px"/>
       <p> {props.name} </p>
    </main>
  );
}