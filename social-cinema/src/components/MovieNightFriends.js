import React from "react";
import FriendList from './FriendList';

export default function MovieNightFriends(props) {
  let theGroup = []
  for (let friend in props.group) {
    theGroup.push(props.group[friend]["friend"])
  }

  return (
    <article className="columnlist">
      {props.user.name}
    <br/>
    <FriendList friends={theGroup} group={props.group} action={props.action}/>
    </article>

  )
}