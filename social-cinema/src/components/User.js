import React from "react";


export default function User(props) {

  return (
    <div className="user-login">
      <h4>{props.user.name}</h4>
      <button type="button" onClick={props.logout}>Logout</button>
    </div>
  );
}