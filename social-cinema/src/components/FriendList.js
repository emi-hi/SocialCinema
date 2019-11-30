import React from "react";
import UserDisplay from "./UserDisplay"
import './lists/styles.css'

export default function FriendList(props) {
  let friends = props.friends.map((friend) => {
    return <UserDisplay key={friend.id} friend={friend} useMovieNight={props.useMovieNight} group={props.group} action={props.action}/>
  });
  
  return (
    <article>
      <h4>Friends</h4>
      <div className={props.classname}>
        {friends}
      </div>
    </article>
  )
}