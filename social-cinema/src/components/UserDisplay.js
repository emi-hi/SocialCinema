import React from "react";

export default function UserDisplay(props) {
  const checkIfInGroup = function() {
    let addEnabled = true;
      for (let friend of props.group) {
        if (props.friend["id"] === friend["friend"]["id"]) {
          addEnabled = false
        }
      }
      if (addEnabled === true) {
        return props.useMovieNight(props.friend)
      } else {
        console.log("remove friend!")
      }
    }
    
  return (
    <div className="user_display">
       <img src={props.friend.icon} height="100px" alt={props.friend.name}/>
       <p>{props.friend.name} </p>
       {props.action==="add" && 
       <button onClick={()=>checkIfInGroup()}>add</button>
      }
      {props.action ==="remove" &&
      <button onClick={()=>checkIfInGroup()}>remove</button>
      }
    </div>
  );
}