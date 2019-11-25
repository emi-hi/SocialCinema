import React, { useState, useEffect } from "react";
import './App.css';

import Genre from "./Genre";
import axios from "axios";

export default function Genres(props) {
  const [genres, setGenres] = useState([])

  useEffect(()=> {
    axios.get("http://localhost:5000/api/genres")
    .then(response => {
      setGenres(response.data);
    })
  },[]);

  const lovedGenres = [];
  const hatedGenres = [];

  for (const genre of props.userGenres) {
    if (genre.preference) {
      lovedGenres.push(genre.id)
    } else if (!genre.preference) {
      hatedGenres.push(genre.id)
    }
  };

  const genreOptions = [];

  for(const genre of genres) {
    genreOptions.push(
      <Genre 
        name={genre.name}
        love_class={lovedGenres.includes(genre.id)? "selected": "unselected"}
        meh_class={lovedGenres.includes(genre.id)? "unselected": hatedGenres.includes(genre.id)? "unselected" : "selected"}
        hate_class={hatedGenres.includes(genre.id)? "selected": "unselected"}
      /> 
    )
  }

  return (
    <div>
      
      <section class="genres">
        {genreOptions}
      </section>
    </div>
  );
}