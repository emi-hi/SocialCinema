import React from "react";
import Popup from "reactjs-popup";


export default function FavoriteForm(props) {
  return(
    <main className="favorite-form">
      <h3>Add a New Favorite</h3>
      <div>Please add the name of your favorite movie</div>
      <textarea width="200px"></textarea>
      <br/>
      
      <button>Cancel</button>
      <button>Search</button>
    </main>
   
  )
}
