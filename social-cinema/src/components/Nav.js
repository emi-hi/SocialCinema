import React from "react";

//this one shows up when there is no favorite. It's just an add symbol.
export default function Nav(props) {
  return (
    <div className="nav">
      <div className="logo">
        <img id="cinema-logo"  src="images/popcorn.png" width="150px" alt="Social Cinema!"/>
        <h1>Social Cinema</h1>
      </div>
      <h1>Emily</h1>
    </div>
  );
}