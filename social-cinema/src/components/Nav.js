import React from "react";

//this one shows up when there is no favorite. It's just an add symbol.
export default function Nav(props) {
  return (
    <div class="nav">
      <div class="logo">
        <img id="cinema-logo"  src="images/cinema-movie.jpg" width="150px"/>
        <h1>Social Cinema</h1>
      </div>
      <h1>Emily</h1>
    </div>
  );
}