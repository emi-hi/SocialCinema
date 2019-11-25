import React from "react";
import './App.css';

import Genre from "./Genre";

export default function Genres(props) {

  const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

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