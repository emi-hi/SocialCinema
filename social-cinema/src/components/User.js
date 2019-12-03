import React from "react";
import Popup from "reactjs-popup";
import FriendInfo from '././FriendInfo'

export default function User(props) {
  const contentStyle = {
    // maxWidth: "300px",
    // height: "200px",
    borderRadius: "20px"
  };

  return (
    <section className="user-login">
      <Popup className="popup" trigger=
      {
        <h4>{props.user.name}</h4>
      }
      modal
      contentStyle={contentStyle}
      >
        {close =>   <FriendInfo friend={props.user.name} close={close}/>}
      </Popup>
      <button className="list-name" onClick={props.logout}>Logout</button>
    </section>




  );
}