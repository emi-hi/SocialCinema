import React from "react";
import UserDisplay from "./UserDisplay"


export default function FriendList(props) {
  let friends = props.friends.map((friend) => {
    return <UserDisplay key={friend.id} friend={friend} useMovieNight={props.useMovieNight} group={props.group} action={props.action}/>
  });
  
  return (
    <article className={props.classname}>{friends}</article>
  )
}