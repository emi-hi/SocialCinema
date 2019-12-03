import './Nav.scss'
import React from "react";
import User from "./User"
import Form from "./Form";
let classnames = require("classnames");

export default function Nav(props) {
  const logOn = (name, password) => {
    return props.getUser(name, password);
  }

  const logOut = () => {
    props.removeUser();
  }


  const favListButton = classnames("list-name", {
    "list-name-disabled": !props.user,
    "list-name-show": props.favList==="show"&& props.user,
    "list-name": props.favList==="hide" && props.user
  });
  const laterListButton = classnames("list-name", {
    "list-name-disabled": !props.user,
    "list-name-show": props.laterList==="show" && props.user,
    "list-name": props.favList==="hide" && props.user
  });
  const genreButton = classnames("list-name", {
    "list-name-disabled": props.themeNight === true,
    "enabled"  : props.themeNight        === false, 
    "list-name-show": props.genreList==="show" && props.themeNight === false,
    "list-name": props.favList==="hide" && props.themeNight === false
  });

  const friendListButton = classnames("list-name", {
    "list-name-disabled": !props.user,
    "list-name-show": props.friendList==="show" && props.user,
    "list-name": props.favList==="hide" && props.user
  });
  const themeNightButton = classnames("list-name", {
    "list-name-disabled": !props.user,
    "list-name-show": props.themeList==="show" && props.user,
    "list-name": props.favList==="hide" && props.user
  });

  const toggleList = function(status) {
    if (status === "show") {
      return "hide" 
    } else {
      return "show"
    }
  }

  const toggleThemeNight = () => {
    if (props.themeNight) {
      props.setThemeList(toggleList)
      props.setThemeNight(false)
    } else {
      props.setThemeList(toggleList)
      props.setGenreList("hide");
      props.setThemeNight(true);
    }
  }
 
  return (
    <nav className="nav">
      <section className="logo">
        <img id="cinema-logo"  src="/images/popcornlogo.png" alt="Social Cinema" />
        <h1>SOCIAL<br/>CINEMA</h1>
        <button className={favListButton} disabled={!props.user} onClick={() => props.setFavList(toggleList)}>
          Favorite Movies
        </button>
        <button className={laterListButton} disabled={!props.user}  onClick={() => props.setLaterList(toggleList)}>
          Later Movies
        </button>
        <button className={genreButton} disabled={props.themeNight} onClick={() => props.setGenreList(toggleList)}>
          My Preferences
        </button>
        <button className={friendListButton} disabled={!props.user} onClick={() => props.setFriendList(toggleList)}>
          My Friends
        </button>
      </section>
        { props.group.length !== 0 &&
          <button className={themeNightButton} onClick={() => toggleThemeNight()}>
            {props.themeNight === false ? "Activate a Theme Night!" : "Remove Theme Night"}
          </button>
        }
      <section className="user-login"> 
      {props.user === "" && <><Form onLogin={logOn} /> <Form createUser={props.createUser} /></> }
      {props.user !== "" && <User user={props.user} logout={() => logOut()} />}
      </section>
    </nav>
  );
}
