import React from "react";


export default function User(props) {

  return (
    <section className="user-login">
      <h4>{props.user.name}</h4>
      <button className="list-name" onClick={props.logout}>Logout</button>
    </section>
  );
}