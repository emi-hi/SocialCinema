import React from "react";
import UserDisplay from "./UserDisplay"


export default function FriendList(props) {
  let friends = props.friends.map((friend) => {
    return <UserDisplay friend={friend} useMovieNight={props.useMovieNight} group={props.group} action={props.action}/>
  });
  
  return (
    <article className={props.classname}>{friends}</article>
  )
}