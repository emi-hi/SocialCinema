import React from "react";
import User from "./User"
import Form from "./Form";

//this one shows up when there is no favorite. It's just an add symbol.
export default function Nav(props) {

  const logOn = (name, password) => {
    return props.getUser(name, password);
  }

  const logOut = () => {
    props.removeUser();
  }

  return (
    <div className="nav">
      <div className="logo">
        <img id="cinema-logo"  src="images/popcorn.png" width="150px" alt="Social Cinema" />
        {props.user === "" ? <><Form onLogin={logOn} /> <Form createUser={props.createUser} /></> : <User user={props.user} logout={() => logOut()} />}
      </div>
    </div>
  );
}
