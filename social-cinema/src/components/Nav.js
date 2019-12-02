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

  const buttonClass1 = classnames("list-name", {
    "list-name-show": props.favList==="show",
    "list-name": props.favList==="hide"
  });
  const buttonClass2 = classnames("list-name", {
    "list-name-show": props.laterList==="show",
    "list-name": props.favList==="hide"
  });
  const buttonClass3 = classnames("list-name", {
    "list-name-show": props.genreList==="show",
    "list-name": props.favList==="hide"
  });
  const buttonClass4 = classnames("list-name", {
    "list-name-show": props.friendList==="show",
    "list-name": props.favList==="hide"
  });
  const buttonClass5 = classnames("list-name", {
    "list-name-show": props.themeList==="show",
    "list-name": props.favList==="hide"
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
        <h1>SOCIAL<br/> CINEMA</h1>
        <button className={buttonClass1} disabled={!props.user} onClick={() => props.setFavList(toggleList)}>
          Favorite Movies
        </button>
        <button className={buttonClass2} disabled={!props.user} onClick={() => props.setLaterList(toggleList)}>
          Later Movies
        </button>
        <button className={buttonClass3} disabled={props.themeNight} onClick={() => props.setGenreList(toggleList)}>
          My Preferences
        </button>
        <button className={buttonClass4} disabled={!props.user} onClick={() => props.setFriendList(toggleList)}>
          My Friends
        </button>
      </section>
        { props.group.length !== 0 &&
          <button className={buttonClass5} onClick={() => toggleThemeNight()}>
            {props.themeNight === false ? "Activate a Theme Night!" : "Remove Theme Night"}
          </button>
        }
      <section className="user-login"> 
        {props.user === "" ? <><Form onLogin={logOn} /> <Form createUser={props.createUser} /></> : <User user={props.user} logout={() => logOut()} />}
      </section>
    </nav>
  );
}
