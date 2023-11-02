import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";



export const Login = () => {
    const {store, actions} = useContext(Context);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("entrei?")
    actions.login(email, password)
  };
  
  return (
    
    <div>
    <h2>Login</h2>

    {(actions.getToken() && actions.getToken()!="" && actions.getToken()!=undefined) ? "You are logged in with this token" + actions.getToken() :
    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
      <input type="submit" value="Login" />
      </div>
    </form>
    }
  </div>
  );
};