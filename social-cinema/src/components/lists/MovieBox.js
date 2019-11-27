import React from "react";

export default function MovieBox(props) {

  const fish = () => {
    console.log("Win");
  }

  return (
    <div className="movie_box">
      <div className="tiny_poster">
        <img src={props.img} height="120px" alt={props.title}/>
      </div>
      <div className="remove" onClick={() => props.removeLaterMovie(props.id)}>
        <img src="./images/trash.png" alt="Delete" />
      </div>
    </div>
  );
}