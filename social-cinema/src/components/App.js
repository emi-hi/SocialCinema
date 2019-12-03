import React, { useState } from 'react';
import axios from 'axios';
import './App.scss';

import List from './lists/List.js'
import Nav from './Nav'
import { DragDropContext } from 'react-beautiful-dnd'


import Suggested from "./Suggested";
import Genres from "./Genres";
import FriendList from './FriendList';
import MovieNightFriends from './MovieNightFriends';

import useApplicationData from "../hooks/useApplicationData";
import RecentSuggestion from './RecentSuggestion';
// import RuntimeSelector from './RuntimeSelector';

function App() {
  const { 
    state,
    setUser,
    getGenres,
    setGenres,
    setLaterMovies,
    removeLaterMovie,
    setFavoriteMovies,
    removeFavoritedMovie,
    setFriends,
    setGroup,
    setTheme
  } = useApplicationData();

  const user = state.user;
  const userGenres = state.genres;
  const friends = state.friends;
  const group = state.group;
  const theme = state.theme;

  const [favList, setFavList] = useState("hide");
  const [laterList, setLaterList] = useState("hide");
  const [genreList, setGenreList] = useState("hide");
  const [friendList, setFriendList] = useState("hide");
  const [themeList, setThemeList] = useState("hide");

  const [recentSuggestions, setRecentSuggestions] = useState([]);
  const minimumRuntime = 30;
  const maximumRuntime = 300;

  const useMovieNight = function(friend, action) {
    if (group.length === 0 && action === "add") {
      setGenreList("hide");
    }

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
      const sugested_movie = { ...recentSuggestions[source.index].newSuggestion }
      const moved_movie = {
        title: sugested_movie.title,
        poster: sugested_movie.poster,
        description: sugested_movie.description,
        tmdbId: draggableId
      }

      new_later_movies.splice(destination.index, 0, moved_movie)
      axios.post(`/api/${state.user.name}/latermovies`, { "suggestedMovie": { ...moved_movie }  })
      .then(response => {
        setLaterMovies(response.data.later_movies)
      })
      .catch(error => {console.log(error)})
    }
  };

  const createUser = (name, password) => {
    return axios.post(`/signup`, { name, password, genres: userGenres })
    .then(response => {
      setUser(response.data.user);
    })
  };

  const getUser = (name, password) => {
    return axios.post("/login", { name, password })
      .then(response => {
        setUser(response.data.user);
        setGenres(response.data.genres);
        setLaterMovies(response.data.later_movies);
        setFavoriteMovies(response.data.favorited_movies);
      })
  };

  const setGenre = (id, value) => {
    if (state.user && state.user.name !== "" && !state.theme) {
      axios.post(`/api/${state.user.name}/genres`, { id, preference: value })
        .then(response => {
          setGenres(response.data.genres)
        })
        .catch(error => {console.log(error)})
    } else {
      const genre = state.genres.find(genre => genre.id === id);
      genre.preference = value;

      setGenres(state.genres);
    }
  };

  const resetGenres = (id) => {
    if (state.user && state.user.name !== "" && !state.themeNight) {
      console.log("IT GOT HERE");
      axios.post(`/api/${state.user.name}/genresreset`)
        .then(response => {
          setGenres(response.data.genres)
        })
        .catch(error => {console.log(error)})
    } else {
      console.log("OOPS IT GOT HERE BY ACCIDENT");
      setGenres([]);
    }
  }

  const setThemeNight = (value) => {
    setTheme(value)

    if (value) {
      setGenres([])
    } else {
      getGenres();
    }
  }

  const removeUser = () => {
    setUser("");
    setGenres([]);
    setLaterMovies([]);
    setFavoriteMovies([]);
    setFriends([]);
    setGroup([]);
    setFavList("hide");
    setLaterList("hide");
    setFriendList("hide");
  }

  return (
    <main className="App">
      <Nav user={user} 
        createUser={createUser} 
        getUser={getUser} 
        removeUser={removeUser} 
        setFavList={setFavList} 
        setLaterList={setLaterList}
        setGenreList={setGenreList}
        setFriendList={setFriendList}
        setThemeList={setThemeList}
        favList={favList}
        friendList={friendList}
        group={group}
        laterList={laterList}
        genreList={genreList}
        themeList={themeList}
        themeNight={theme}
        setThemeNight={setThemeNight}
      />
      <DragDropContext
        onDragEnd={onDragEnd}
      >
      {favList === "show" &&   
        <List type="favorites" data={state.favorited_movies} user={user} setFavoriteMovies={setFavoriteMovies} removeLaterMovie={removeFavoritedMovie} /> 
      } 
      {laterList === "show" &&
        <List type="laters" removeLaterMovie={removeLaterMovie} data={state.later_movies} /> 
      }
      {(genreList === "show" || themeList === "show") &&
        <article className="preferences-list">
          <Genres userGenres = {userGenres} setGenre={setGenre} resetGenres={resetGenres}/>
          {/* <RuntimeSelector minimumRuntime={minimumRuntime} setMinimumRuntime={setMinimumRuntime} maximumRuntime={maximumRuntime} setMaximumRuntime={setMaximumRuntime}/> */}
        </article>
      }
      {friendList === "show" &&
        <FriendList name={state.user.name} friends={friends} useMovieNight={useMovieNight} group={group} action="add" classname="list" type="All Friends  - click + on a friend to add them to your movie night"/>
      }
      <section className="main-container">
        {recentSuggestions.length > 0 ?
          <RecentSuggestion id={"recent"} type={"laters"} recent={recentSuggestions}/> : <div></div>
        }
        <Suggested
          recentSuggestions={recentSuggestions}
          getRecentSuggestions={getRecentSuggestions}
          user={user}
          group={group}
          userGenres={userGenres}
          theme={theme}
          setLaterMovies={setLaterMovies}
          minimumRuntime={minimumRuntime}
          maximumRuntime={maximumRuntime}
        />
        {state.group.length > 0 ?
          <MovieNightFriends  group={group} action="remove" classname="columnlist" useMovieNight={useMovieNight} />:<div></div>
        }
      </section>
      </DragDropContext>
      <footer>
          <a href="https://icons8.com/" target="_blank" rel="noopener noreferrer"><img className="icon8" src="images/icon8.png" alt="icon8 logo"></img></a>
          <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer"><img className="tmdb" src="images/tmdb.png" alt="tmdb logo"></img></a>
      </footer>
    </main>
  );
}

export default App;
