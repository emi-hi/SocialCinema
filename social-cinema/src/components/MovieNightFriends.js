import React from "react";
import FriendList from './FriendList';
import '../styles/userstyles.css'

export default function MovieNightFriends(props) {
  let theGroup = []
  for (let friend in props.group) {
    theGroup.push(props.group[friend]["friend"])
  }

  return (
    <article className="columnlist">
    <FriendList friends={theGroup} group={props.group} action={props.action} useMovieNight={props.useMovieNight}/>
    </article>

  )
}