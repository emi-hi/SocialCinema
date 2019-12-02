import React, { useState } from "react";
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
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <>
      { props.createUser ? <button className="list_name" style={specialStyle} onClick={openModal}>Register</button> : <button className="list_name" style={specialStyle} onClick={openModal}>Sign In</button> }
      <Popup open={open}
        onClose={closeModal}
        contentStyle={contentStyle}
      >
        {props.createUser && <Signup createUser={props.createUser} close={closeModal} />}
        {props.onLogin && <Login onLogin={props.onLogin} close={closeModal} />}         
      </Popup>
    </>
  );
}
