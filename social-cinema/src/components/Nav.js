import React from "react";
import Logon from "./Logon"
import User from "./User"

//this one shows up when there is no favorite. It's just an add symbol.
export default function Nav(props) {

  const logOn = (name) => {
    console.log(name);
    props.getUser(name)
  }

  return (
    <div class="nav">
      <div class="logo">
        <img id="cinema-logo"  src="images/popcorn.png" width="150px"/>
        {props.user === "" ? <Logon onLogin={logOn} /> : <User user={props.user} logout={() => logOn("")} />}
      </div>
    </div>
  );
}