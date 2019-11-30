import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import List from './lists/List.js'
import Nav from './Nav'
import { DragDropContext } from 'react-beautiful-dnd'


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

  const onDragEnd = (result) => {
    // TODO : update
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      }

      if (destination.droppableId === "favorites") {
        const new_fav_movies = [...state.favorited_movies]
        const moved_movie = { ...new_fav_movies[source.index] }
  
        new_fav_movies.splice(source.index, 1);
        new_fav_movies.splice(destination.index, 0, moved_movie)

        setFavoriteMovies(new_fav_movies)
      } else if (destination.droppableId === "laters") {
        const new_later_movies = [...state.later_movies]
        const moved_movie = { ...new_later_movies[source.index] }

        new_later_movies.splice(source.index, 1);
        new_later_movies.splice(destination.index, 0, moved_movie)
  
        setLaterMovies(new_later_movies)
      }
    } else if (destination.droppableId === "laters" && source.droppableId === "recent") {
      const new_later_movies = [...state.later_movies]
      const sugested_movie = { ...recentSuggestions[destination.index] }
      const moved_movie = {
        title: sugested_movie.title,
        img: sugested_movie.poster,
      }

      new_later_movies.splice(destination.index, 0, moved_movie)

      console.log(new_later_movies)

      setLaterMovies(new_later_movies)
    }
  }

  const createUser = (name, password) => {
    return axios.post(`http://localhost:5000/signup`, { name, password, genres: userGenres })
    .then(response => {
      console.log("WEE RES!", response)

      setUser(response.data.user);
    })
  }

  const getUser = (name, password) => {
    return axios.post("http://localhost:5000/login", { name, password })
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
      <Nav user={user} 
        createUser={createUser} 
        getUser={getUser} 
        removeUser={removeUser} 
        setFavList={setFavList} 
        setLaterList={setLaterList}
        setGenreList={setGenreList}
        setFriendList={setFriendList}
        favList={favList}
        friendList={friendList}
        laterList={laterList}
        genreList={genreList}
      />
      <DragDropContext
        onDragEnd={onDragEnd}
      >
      <div>
        {favList === "show" &&   
          <List type="favorites" data={state.favorited_movies} user={user} setFavoriteMovies={setFavoriteMovies} removeLaterMovie={removeFavoritedMovie} /> 
        } 
      </div>
      <div>
        {laterList === "show" &&
          <List type="laters" removeLaterMovie={removeLaterMovie} data={state.later_movies} /> 
        }
      </div>

      <div>
      {genreList === "show" &&
        <div>
          <Genres userGenres = {userGenres} setGenre={setGenre} />
          <RuntimeSelector minimumRuntime={minimumRuntime} setMinimumRuntime={setMinimumRuntime} maximumRuntime={maximumRuntime} setMaximumRuntime={setMaximumRuntime}/>
        </div>
      }
      </div> 
      <div>
      {friendList === "show" &&
        <FriendList friends={friends} useMovieNight={useMovieNight} group={group} action="add" classname="list"/>
      }
      </div>
      <div className="main-container">
        <div className="friends-container">
          FRIENDS FOR MOVIE NIGHT!
          <MovieNightFriends  group={group} action="remove" classname="columnlist" useMovieNight={useMovieNight}/>
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
      </DragDropContext>
    </div>
  );
}

export default App;
