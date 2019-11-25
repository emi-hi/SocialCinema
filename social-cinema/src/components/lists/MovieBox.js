import React from "react";

export default function MovieBox(props) {
  return (
    <main className="movie_box">
       <img src={props.img} height="100px" alt={props.title}/>
       <p> {props.title} </p>
       
    </main>
  );
}