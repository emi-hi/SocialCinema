import React from "react";
import UserDisplay from "./UserDisplay"


export default function FriendList(props) {

  let friends = props.friends.map((friend) => {
    return <UserDisplay icon={friend["icon"]} name={friend["name"]}/>
  });
  
  return (
    <article className="list">{friends}</article>
  )
}