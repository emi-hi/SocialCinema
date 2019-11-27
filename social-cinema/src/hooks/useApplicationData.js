import { useReducer, useEffect } from "react";
import reducer, { SET_USER, SET_GENRES, SET_LATER_MOVIES, SET_FRIENDS, SET_GROUP } from "../reducers/application";
import axios from 'axios'

const initGenres = () => {
  let genres = []
  return axios.get("http://localhost:5000/api/genres")
  .then(response => {
    genres = response.data.map(genre => {
      return genre = {
        id: genre.id,
        preference: ""
      }
    })

    return genres
  })
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    user: JSON.parse(localStorage.getItem('user')) || "",
    genres: [],
    favorite_movies: [],
    later_movies: [],
    friends: [],
    group: []
  });

  useEffect(() => {
    initGenres()
    .then(res => {
      setGenres(res);
    })
  }, [])

  useEffect(() => {
    if (state.user !== "") {
      Promise.all([
        axios.get(`http://localhost:5000/api/${state.user.name}/genres`)
      ])
      .then((all) => {
        setGenres(all[0].data.genres)
      })
    }
  }, [state.user])

  const setUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: SET_USER, value: user });
  };

  const setGenres = genres => {
    if (genres.length === 0) {
      initGenres()
      .then(res => {
        dispatch({ type: SET_GENRES, value: res });
      })
    } else {
      dispatch({ type: SET_GENRES, value: genres });
    }
  };

  const setLaterMovies = laterMovies => {
    dispatch({ type: SET_LATER_MOVIES, value:laterMovies });
  }

  const setFriends = friends => {
    dispatch({ type: SET_FRIENDS, value: friends });
  }

  const setGroup = group => {
    dispatch({ type: SET_GROUP, value: group });
  }

  return { state, setUser, setGenres, setLaterMovies, setFriends, setGroup };
};
