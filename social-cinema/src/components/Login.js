import React, { useState } from "react";

export default function Signup(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  
  const signup = (event) => {
    event.preventDefault();
    props.onLogin(name, password)
  }

  return (
    <main className="">
      <form onSubmit={signup}>
        <label>
          Username:
        </label>
        <input 
            type="text" 
            value={name}
            placeholder="Enter Username"
            onChange={e => setName(e.target.value)}
        />
        <label>
          Password:
        </label>
        <input 
            type="password" 
            value={password}
            placeholder="Enter Password"
            onChange={e => setPassword(e.target.value)}
        />

        <input type="submit" value="Login"/>
      </form>
    </main>
  );
}