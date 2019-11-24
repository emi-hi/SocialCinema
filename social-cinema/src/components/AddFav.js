import React from "react";

//this one shows up when there is no favorite. It's just an add symbol.
export default function AddFav(props) {
  return (
    <main className="favorite_add">
      <img
        src="images/add.png"
        alt="Add" 
      />
    </main>
  );
}