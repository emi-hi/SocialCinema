import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import List from './lists/List.js'
import Nav from './Nav'

import Suggested from "./Suggested";
import Genres from "./Genres";
import FriendList from './FriendList';
import MovieNightFriends from './MovieNightFriends';

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
  const [user, setUser] = useState("")
  const [favList, setFavList] = useState("hide")
  const [laterList, setLaterList] = useState("hide")
  const [genreList, setGenreList] = useState("hide")
  const [friendList, setFriendList] = useState("hide")
  const [friends, setFriends] = useState([])

  const userGenres =[
    {
      "id": 28,
      "preference": true
    },
    {
      "id": 12,
      "preference": true
    },
    {
      "id": 80,
      "preference": false
    }
  ];

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
        console.log(response.data)
        const user = response.data
        setUser(user.name)
      })
  }

  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
    .then(response => {
      console.log(response.data)
      setFriends(response.data)
    })  
  }, [user])

  return (  
    <div className="App">
      <Nav user={user} getUser={getUser} />
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
        <Genres userGenres = {userGenres}/>
      }
      </div> 
      <div className="list_name" onClick={() => setFriendList(toggleList)}>
        My Friends
      </div>
      <div>
      {friendList === "show" &&
        <FriendList friends={friends}/>
      }
      </div>
      <div className="main-container">
        <div className="friends-container">
          FRIENDS FOR MOVIE NIGHT!
          <MovieNightFriends  user={user}/>
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
