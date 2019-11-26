
import React from "react";
//shows loading icon with a message (saving, deleting, etc)
export default function Loading(props) {
  return (
    <main>
      <img
        src="images/filmreel.png" 
        className="initial-suggest" 
        alt="Loading"
      />
      <h1>{props.message}</h1>
    </main>
  );
}
