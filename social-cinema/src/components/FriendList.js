import React from "react";
import UserDisplay from "./UserDisplay"
import './lists/styles.scss'
let classnames = require("classnames");



export default function FriendList(props) {
  const friends = props.friends.map((friend) => {
    if (friend.name !== props.name) {
      return <UserDisplay key={friend.id} friend={friend} useMovieNight={props.useMovieNight} group={props.group} action={props.action} />
    }

    return ""
  });
  
  const friendListHoriz = classnames("list", {
    "list-friends" : props.action === "add"
  })

  const friendListColumn = classnames("", {
    "columnlist" : props.action === "remove"
  })
  
  return (
    <article>
      {friends.length>0? <h4 className="computer-title">{props.type}</h4>: ""}
      {props.classname==="list"? <h4 className="mobile-title">{props.type}</h4>: ""}
      <section className={props.action === "add"? friendListHoriz: friendListColumn}>
        {friends}
      </section>
    </article>
  )
}