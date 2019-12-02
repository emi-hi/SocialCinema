import React from "react";
import Popup from "reactjs-popup";

import Signup from "./Signup"
import Login from "./Login"

const contentStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "20px"
};

const specialStyle={
  backgroundColor:"transparent",
  color: "white",
  border:0
}

export default function Form(props) {
  return (
    <>
      <Popup trigger=
        {
          props.createUser ? <button style={specialStyle}>Register</button> : <button style={specialStyle}>Sign In</button>
        } modal
        contentStyle={contentStyle}>
        {props.createUser && <Signup createUser={props.createUser} />}
        {props.onLogin && <Login onLogin={props.onLogin} />}
      </Popup>
    </>
  );
}