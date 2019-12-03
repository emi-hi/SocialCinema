import "./MovieInfo.scss"
import React from "react"

export default function MovieInfo(props) {
  console.log(props)

return (
  <main className="movie-info-form">
    <span className="close-modal" onClick={props.close}>
      &times;
    </span>
    <img className="info-img" src={props.img} />
    <div>
      <h2>{props.title}</h2>
      <p className="description">{props.description}</p>
    </div>
  </main>

  )
}