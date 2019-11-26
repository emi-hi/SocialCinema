import { useReducer, useEffect } from "react";
import reducer, { SET_USER, SET_GENRES } from "../reducers/application";
import axios from 'axios'

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    user: JSON.parse(localStorage.getItem('user')) || "",
    genres: [],
    favorite_movies: {},
    later_movies: {}
  });

  useEffect(() => {
    if (state.user !== "") {
      Promise.all([
        axios.get(`http://localhost:5000/api/${state.user.name}/genres`)
      ])
      .then((all) => {
        console.log(all[0].data.genres)
        setGenres(all[0].data.genres)
      })
    }
  }, [state.user])

  const setUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: SET_USER, value: user });
  };

  const setGenres = genres => {
    dispatch({ type: SET_GENRES, value: genres });
  };

  return { state, setUser, setGenres };
};
