import React from "react";
import Popup from "reactjs-popup";

import Signup from "./Signup"
import Login from "./Login"

const contentStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "20px"
};

export default function Form(props) {
  return (
    <main className="">
      <Popup trigger=
        {
          props.createUser ? <button className="list_name">register</button> : <button className="list_name">sign in</button>
        } modal
        contentStyle={contentStyle}>
        {props.createUser && <Signup createUser={props.createUser} />}
        {props.onLogin && <Login onLogin={props.onLogin} />}
      </Popup>
    </main>
  );
}