import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Signup = () => {
  const {store, actions} = useContext(Context);

  const [signName, setSignName] = useState("");

  const [signEmail, setSignEmail] = useState("");

  const [signPassword, setSignPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const signupResult = actions.signup(signName, signEmail, signPassword) 
    signupResult.then(result => {
      if (result === true){
        navigate("/login") 
       }
    else alert("Please try again")

    })
    
  };
  
  return (
    
    <div>
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={signName}
          onChange={(e) => setSignName(e.target.value)}
        />
      </div>
      
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={signEmail}
          onChange={(e) => setSignEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={signPassword}
          onChange={(e) => setSignPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  </div>
  );
};

