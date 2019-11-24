import React, { useState } from 'react';
import './App.css';
import List from './List'
import Nav from './Nav'

import Suggested from "./Suggested";
import Genre from "./Genre";

const tempFaves = [
  {id: 1, name: 'Titanic', img: 'images/movies/titanic.jpg' },
  {id: 2, name: 'Scary Movie', img: 'images/movies/scary.jpg' },
  {id: 3, name: 'Jaws', img: 'images/movies/jaws.jpg'},
  {id: 4, name: 'Baby Driver', img: 'images/movies/baby.jpeg' },
]

const tempLater = [
  {id: 1, name: 'Titanic 2', img: 'images/movies/titanic.jpg' },
  {id: 2, name: 'Scary Movie 2', img: 'images/movies/scary.jpg' },
  {id: 3, name: 'Jaws 2', img: 'images/movies/jaws.jpg'},
  {id: 4, name: 'Baby Driver 2', img: 'images/movies/baby.jpeg' },
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
