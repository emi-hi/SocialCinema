import React, { useState, useEffect, useRef} from "react";

export default function Signup(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("")
  const [error, setError] = useState("")
  
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const signup = (event) => {
    event.preventDefault();
    if (password !== "" && password === passwordConf) {
      props.createUser(name, password)
      .catch(() => {
        setError("Username already exists.")
      })
    } else {
      setError("Invalid password.")
    }
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
        <input 
            type="password" 
            value={passwordConf}
            placeholder="Confirm Password"
            onChange={e => setPasswordConf(e.target.value)}
        />
        <br/>
        <input type="submit" value="Signup"/>
      </form>
    </main>
  );
}