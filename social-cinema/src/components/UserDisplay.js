import React from "react";

export default function UserDisplay(props) {
  return (
    <div className="user_display">
       <img src={props.icon} height="100px" alt={props.name}/>
       <p> {props.name} </p>
    </div>
  );
}