import React, { useState } from "react";

//this one shows up when there is no favorite. It's just an add symbol.
export default function Logon(props) {
  const [name, setName] = useState("")

  const validate = () => {
    if (name !== "") {
      props.onLogin(name);
    }
  }

  return (
    <div class="logon">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          name="name"
          type="text"
          placeholder="Enter Username"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </form>
      <button type="button" onClick={()=> validate()}>Login</button>
    </div>
  );
}