import React from "react";
import Popup from "reactjs-popup";

import FavoriteForm from './FavoriteForm'

const contentStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "20px"
};

//this one shows up when there is no favorite. It's just an add symbol.
export default function AddFav(props) {
  return (
    <main className="favorite_add">
      <Popup trigger={
      <img
        src="images/add.png"
        alt="Add" 
      />
    } modal
    contentStyle={contentStyle}>
    <FavoriteForm user={props.user} setFavoriteMovies={props.setFavoriteMovies}/>
    </Popup>
    </main>
  );
}

