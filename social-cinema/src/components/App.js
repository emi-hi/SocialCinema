import React, { useState } from 'react';
import './App.css';
import List from './lists/List.js'
import Nav from './Nav'
import FavoriteForm from './lists/FavoriteForm'

import Suggested from "./Suggested";
import Genre from "./Genre";

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

  const [favList, setFavList] = useState("hide")
  const [laterList, setLaterList] = useState("hide")

  const toggleList = function(status) {
    if (status === "show") {
      return "hide" 
    } else {
      return "show"
    }
  }
  return (
    
    <div className="App">
      <Nav/>
      <div className="list_name" onClick={() => setFavList(toggleList)}>
      <h3>Favorite Movies</h3>
      </div>
      <div>
      {favList === "show" &&
      <List type="favorites" data={tempFaves}/> 
      }
      </div>
      <div className="list_name" onClick={() => setLaterList(toggleList)}>
      <h3>Later Movies</h3>
      </div>
      <div>
      {laterList === "show" &&
      <List type="laters" data={tempLater}/> 
      }
      </div>
      <Genre/>
      <Suggested/>
    </div>
  );
}

export default App;
