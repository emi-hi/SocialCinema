import React from "react";
import Logon from "./Logon"
import User from "./User"

//this one shows up when there is no favorite. It's just an add symbol.
export default function Nav(props) {

  const logOn = (name) => {
    props.getUser(name);
  }

  const logOut = () => {
    props.removeUser();
  }

  return (
    <div className="nav">
      <div className="logo">
        <img id="cinema-logo"  src="images/popcorn.png" width="150px" alt="Social Cinema" />
        {props.user === "" ? <Logon onLogin={logOn} /> : <User user={props.user} logout={() => logOut()} />}
      </div>
    </div>
  );
}