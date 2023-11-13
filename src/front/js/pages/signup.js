import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Signup = () => {
  const { store, actions } = useContext(Context);

  const [signName, setSignName] = useState("");

  const [signEmail, setSignEmail] = useState("");

  const [signPassword, setSignPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const signupResult = actions.signup(signName, signEmail, signPassword)
    signupResult.then(result => {
      if (result === true) {
        navigate("/login")
      }
      else alert("Please try again")

    })

  };

  return (

    <div>
      <h2>Sign Up</h2>
      <form className="info-wrapper py-4 px-4 d-flex flex-column was-validated" onSubmit={handleSubmit}>
        <div className="form-group row d-flex justify-content-between px-0">
          <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
          </div></div>
        <div>
          <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required value={signName}
            onChange={(e) => setSignName(e.target.value)}
            className="form-control p-2 border-4"></input><div className="invalid-feedback">
            Please provide a name.
          </div>


        </div>

        <div>
          <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl" /> </span>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required value={signEmail}
            onChange={(e) => setSignEmail(e.target.value)}
            className="form-control p-2 border-4"></input><div className="invalid-feedback">
            Please provide a e-mail.
          </div>
        </div>
        <div>
          <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-key" size="2xl" /> </span>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required value={signPassword}
            onChange={(e) => setSignPassword(e.target.value)}
            className="form-control p-2 border-4"></input><div className="invalid-feedback">
            Please insert your secret password.
          </div>
        </div>
        <div>
          <button type="submit"className="save-info btn btn-primary p-2 mt-3 mx-2">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

