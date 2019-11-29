import React from "react";
import Popup from "reactjs-popup";

import Signup from "./Signup"
import Login from "./Login"

const contentStyle = {
  width: "300px",
  height: "300px",
  borderRadius: "20px"
};

//this one shows up when there is no favorite. It's just an add symbol.
export default function Form(props) {
  return (
    <main className="">
      <Popup trigger=
        {
          <img
            src="images/add.png"
            alt="Add" 
          />
        } modal
        contentStyle={contentStyle}>
        {props.createUser && <Signup createUser={props.createUser} />}
        {props.onLogin && <Login onLogin={props.onLogin} />}
      </Popup>
    </main>
  );
}