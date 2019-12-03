import React from "react";
import FriendList from './FriendList';
import '../styles/userstyles.scss'

export default function MovieNightFriends(props) {
  let theGroup = []
  for (let friend in props.group) {
    theGroup.push(props.group[friend]["friend"])
  }

  return (
    <section >
      {theGroup.length>0? <h4 className="mobile-title">Friends for Movie Night</h4>: ""}
    <article className="columnlist friends-container">
    <FriendList friends={theGroup} group={props.group} action={props.action} useMovieNight={props.useMovieNight} type="Friends for Movie Night"/>
    </article>
    </section>
  )
}