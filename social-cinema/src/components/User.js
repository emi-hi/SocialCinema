import React from "react";


export default function User(props) {

  return (
    <div className="user-login">
      <h1>{props.user.name}</h1>
      <button type="button" onClick={props.logout}>Logout</button>
    </div>
  );
}