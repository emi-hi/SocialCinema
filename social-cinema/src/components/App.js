import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import List from './lists/List.js'
import Nav from './Nav'

import Suggested from "./Suggested";
import Genres from "./Genres";
import FriendList from './FriendList';
import MovieNightFriends from './MovieNightFriends';

import useApplicationData from "../hooks/useApplicationData";
import RecentSuggestion from './RecentSuggestion';
import RuntimeSelector from './RuntimeSelector';

function App() {
  const { 
    state,
    setUser,
    setGenres,
    setLaterMovies,
    removeLaterMovie,
    setFavoriteMovies,
    removeFavoritedMovie,
    setFriends,
    setGroup
  } = useApplicationData();

  const user = state.user;
  const userGenres = state.genres;
  const friends = state.friends
  const group = state.group

  const [favList, setFavList] = useState("hide")
  const [laterList, setLaterList] = useState("hide")
  const [genreList, setGenreList] = useState("hide")
  const [friendList, setFriendList] = useState("hide")

  const [recentSuggestions, setRecentSuggestions] = useState([])
  const [minimumRuntime, setMinimumRuntime] = useState(30)
  const [maximumRuntime, setMaximumRuntime] = useState(300)

  const useMovieNight = function(friend, action) {
    if (action === "add") {
      setGroup([
        ...group, {
          friend
        }
      ])
    } else if (action === "remove") {
      let newGroup = []
      for (let each of group) {
        if (!(friend["id"] === each["friend"]["id"])) {
          newGroup.push(each)
        }
      }
      setGroup(newGroup)
    }
  }

  const getRecentSuggestions = function(newSuggestion) {
    let updatedRecentSuggestionsList = [...recentSuggestions]
    updatedRecentSuggestionsList.unshift({newSuggestion})
    if (updatedRecentSuggestionsList.length > 15) {
      updatedRecentSuggestionsList = updatedRecentSuggestionsList.slice(0, updatedRecentSuggestionsList.length - 1)
    }
      setRecentSuggestions(updatedRecentSuggestionsList)
  }

  const toggleList = function(status) {
    if (status === "show") {
      return "hide" 
    } else {
      return "show"
    }
  }

  const getUser = (name) => {
    axios.post("http://localhost:5000/login", { name, genres: userGenres })
      .then(response => {
        setUser(response.data.user);
        setGenres(response.data.genres);
        setLaterMovies(response.data.later_movies);
        setFavoriteMovies(response.data.favorited_movies);
      })
  }

  const setGenre = (id, value) => {
    if (state.user && state.user.name !== "") {
      axios.post(`http://localhost:5000/api/${state.user.name}/genres`, { id, preference: value })
        .then(response => {
          setGenres(response.data.genres)
        })
    } else {
      const genre = state.genres.find(genre => genre.id === id);
      genre.preference = value;

      setGenres(state.genres);
    }
  }

  const removeUser = () => {
    setUser("");
    setGenres([]);
    setLaterMovies([]);
    setFavoriteMovies([]);
    setFriends([]);
    setGroup([]);
  }

  return (
    <div className="App">
      <Nav user={user} getUser={getUser} removeUser={removeUser} />
      <div className="list_name" onClick={() => setFavList(toggleList)}>
        Favorite Movies
      </div>
      <div>
        {favList === "show" &&
          <List type="favorites" data={state.favorited_movies} user={user} setFavoriteMovies={setFavoriteMovies} removeLaterMovie={removeFavoritedMovie} /> 
        }
      </div>
      <div className="list_name" onClick={() => setLaterList(toggleList)}>
        Later Movies
      </div>
      <div>
        {laterList === "show" &&
          <List type="laters" removeLaterMovie={removeLaterMovie} data={state.later_movies} /> 
        }
      </div>
      <div className="list_name" onClick={() => setGenreList(toggleList)}>
        My Preferences
      </div>
      <div>
      {genreList === "show" &&
        <div>
          <Genres userGenres = {userGenres} setGenre={setGenre} />
          <RuntimeSelector minimumRuntime={minimumRuntime} setMinimumRuntime={setMinimumRuntime} maximumRuntime={maximumRuntime} setMaximumRuntime={setMaximumRuntime}/>
        </div>
      }
      </div> 
      <div className="list_name" onClick={() => setFriendList(toggleList)}>
        My Friends
      </div>
      <div>
      {friendList === "show" &&
        <FriendList friends={friends} useMovieNight={useMovieNight} group={group} action="add" classname="list"/>
      }
      </div>
      <div className="main-container">
        <div className="friends-container">
          FRIENDS FOR MOVIE NIGHT!
          <MovieNightFriends  user={user} group={group} action="remove" classname="columnlist" useMovieNight={useMovieNight}/>
        </div>
        <div className="suggested-container">
          <Suggested
            recentSuggestions={recentSuggestions}
            getRecentSuggestions={getRecentSuggestions}
            user={user}
            group={group}
            userGenres={userGenres}
            setLaterMovies={setLaterMovies}
            minimumRuntime={minimumRuntime}
            maximumRuntime={maximumRuntime}
          />
        </div>
        <div className="recent-suggestion-list-container">
          RECENTLY SUGGESTED LIST
          <RecentSuggestion recent={recentSuggestions}/>
        </div>
      </div>
    </div>
  );
}

export default App;
