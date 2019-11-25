import { useReducer } from "react";
import reducer, { SET_USER, SET_GENRES } from "../reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    user: JSON.parse(localStorage.getItem('user')) || "",
    genres: {},
    favorite_movies: {},
    later_movies: {}
  });

  const setUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: SET_USER, value: user });
  };

  const setGenres = genres => {
    dispatch({ type: SET_GENRES, value: genres });
  };

  return { state, setUser, setGenres };
};
