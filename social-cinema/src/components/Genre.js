import React from "react";
import '../styles/genre.scss';
export default function Genre(props) {
  let feelingImg;
  let imgClassName="genre-feeling";

  if (props.hate_class === "selected") {
    feelingImg = "images/no.svg";
    imgClassName += "-hate";
  } else if (props.love_class === "selected") {
    feelingImg = "images/love.png";
    imgClassName += "-love";
  }

  let displayName;
  if (props.name === 'Science Fiction'){
    displayName = 'Sci Fi'
  } else {
    displayName = props.name
  }

  return (
    <button className="genre">
      {feelingImg && <img src={feelingImg} className={imgClassName} alt={feelingImg}/>}
      <img src={`images/genreicons/${props.name.replace(" ", "")}.svg`} className="genre-image" alt={`${props.name}`} />
      <h6 className="genre-name">{displayName}</h6>
      <section className="genre-choices">
        <button type="button" id="hategenre" className={props.hate_class} onClick={() => props.setGenre(props.id, false)}>Hate it!</button>
        <button type="button" id="mehgenre" className={props.meh_class} onClick={() => props.setGenre(props.id, null)}>Meh</button>
        <button type="button" id="lovegenre" className={props.love_class} onClick={() => props.setGenre(props.id, true)}>Love it!</button>
      </section>
    </button>
  )
}
