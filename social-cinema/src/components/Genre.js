import React from "react";
import '../styles/genre.css';
export default function Genre(props) {

  return (
    
    <div className="genre">
      
      <img src={`images/genreicons/${props.name}.svg`} className="genre-image" alt={`${props.name}`} />
      <p className="genre-name">{props.name}</p>
      <div className="genre-choices">
        <button type="button" id="hategenre" className={props.hate_class} onClick={() => props.setGenre(props.id, false)}>Hate it!</button>
        <button type="button" id="mehgenre" className={props.meh_class} onClick={() => props.setGenre(props.id, "")}>Meh</button>
        <button type="button" id="lovegenre" className={props.love_class} onClick={() => props.setGenre(props.id, true)}>Love it!</button>
      </div>
    </div>
  )
}
