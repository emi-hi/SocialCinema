import React, { useState, useEffect, useRef } from "react";

export default function Signup(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);


  const signup = (event) => {
    event.preventDefault();
    props.onLogin(name, password)
    .catch(() => {
      setError("Invalid username/password.");
    })
  }

  return (
    <main className="userForm">
      <span className="close-modal" onClick={props.close}>
        &times;
      </span>
      <div>{error}</div>
      <form onSubmit={signup}>
        <input 
            type="text" 
            value={name}
            ref={inputRef}
            placeholder="Enter Username"
            onChange={e => setName(e.target.value)}
        />
        <input 
            type="password" 
            value={password}
            placeholder="Enter Password"
            onChange={e => setPassword(e.target.value)}
        />
        <br/>
        <input type="submit" value="Login"/>
      </form>
    </main>
  );
}