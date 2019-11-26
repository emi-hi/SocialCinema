import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import List from './lists/List.js'
import Nav from './Nav'

import Suggested from "./Suggested";
import Genres from "./Genres";
import FriendList from './FriendList';
import MovieNightFriends from './MovieNightFriends';

import useApplicationData from "../hooks/useApplicationData";

const tempFaves = [
  {id: 1, title: 'Titanic', img: 'images/movies/titanic.jpg' },
  {id: 2, title: 'Scary Movie', img: 'images/movies/scary.jpg' },
  {id: 3, title: 'Jaws', img: 'images/movies/jaws.jpg'},
  {id: 4, title: 'Baby Driver', img: 'images/movies/baby.jpeg' }
]

const tempLater = [
  {id: 1, title: 'Titanic 2', img: 'images/movies/titanic.jpg' },
  {id: 2, title: 'Scary Movie 2', img: 'images/movies/scary.jpg' },
  {id: 3, title: 'Jaws 2', img: 'images/movies/jaws.jpg'},
  {id: 4, title: 'Baby Driver 2', img: 'images/movies/baby.jpeg' }
]

function App() {
  const { state, setUser, setGenres } = useApplicationData();

  const user = state.user;
  // const genreList = state.genres;

  const [favList, setFavList] = useState("hide")
  const [laterList, setLaterList] = useState("hide")
  const [genreList, setGenreList] = useState("hide")
  const [friendList, setFriendList] = useState("hide")
  const [friends, setFriends] = useState([])
  const [group, addToGroup] = useState([{"friend":
    {"icon": "https://ui-avatars.com/api/?name=Alan",
    "id": 5,
    "name": "Alan"}}])
 

  const userGenres = state.genres;

  const useMovieNight = function(friend) {
    addToGroup([
      ...group, {
        friend
      }
    ])
    console.log(group)
  }

  const toggleList = function(status) {
    if (status === "show") {
      return "hide" 
    } else {
      return "show"
    }
  }

  const getUser = (name) => {
    axios.post("http://localhost:5000/login", { name: name })
      .then(response => {
        setUser(response.data.user);
        setGenres(response.data.genres)
      })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
    .then(response => {
      setFriends(response.data)
    })  
  }, [user])


 
  const removeUser = () => {
    setUser("");
    setGenres([]);
  }

  return (
    
    <div className="App">
      <Nav user={user} getUser={getUser} removeUser={removeUser} />
      <div className="list_name" onClick={() => setFavList(toggleList)}>
        Favorite Movies
      </div>
      <div>
        {favList === "show" &&
        <List type="favorites" data={tempFaves}/> 
        }
      </div>
      <div className="list_name" onClick={() => setLaterList(toggleList)}>
        Later Movies
      </div>
      <div>
        {laterList === "show" &&
        <List type="laters" data={tempLater}/> 
        }
      </div>
      <div className="list_name" onClick={() => setGenreList(toggleList)}>
        My Genre Preferences
      </div>
      <div>
      {genreList === "show" &&
        <Genres userGenres = {userGenres} />
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
          <MovieNightFriends  user={user} group={group} action="remove" classname="columnlist"/>
        </div>
        <div className="suggested-container">
          <Suggested/>
        </div>
        <div className="recent-suggestion-list-container">
          RECENTLY SUGGESTED LIST
        </div>
      </div>
    </div>
  );
}

export default App;
