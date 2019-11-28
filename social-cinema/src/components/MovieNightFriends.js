import React from "react";
import FriendList from './FriendList';

export default function MovieNightFriends(props) {
  let theGroup = []
  for (let friend in props.group) {
    theGroup.push(props.group[friend]["friend"])
  }

  return (
    <article className="columnlist">
      <img className="user-icon"src={props.user.avatar} width="100px" height="100px" alt={props.user.name}/>
      you
    <FriendList friends={theGroup} group={props.group} action={props.action} useMovieNight={props.useMovieNight}/>
    </article>

  )
}