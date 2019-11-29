import React from "react";
import Logon from "./Logon"
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

  let display;
  props.user===""? display="None": display="True"
  return (
    <div className="nav">
      <div className="logo">
        <img id="cinema-logo"  src="images/popcorn.png" width="150px" alt="Social Cinema" />
        
        <button className="list_name" disabled={!props.user} onClick={() => props.setFavList(props.toggleList)}>
          Favorite Movies
        </button>
        <button className="list_name" disabled={!props.user} onClick={() => props.setLaterList(props.toggleList)}>
          Later Movies
        </button>
        <button className="list_name" onClick={() => props.setGenreList(props.toggleList)}>
          My Preferences
        </button>
        <button className="list_name" disabled={!props.user} onClick={() => props.setFriendList(props.toggleList)}>
          My Friends
        </button>
      </div>
      <div className="user-login"> 
        {props.user === "" ? <><Form onLogin={logOn} /> <Form createUser={props.createUser} /></> : <User user={props.user} logout={() => logOut()} />}
      </div>

    </div>
  );
}
