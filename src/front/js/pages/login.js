import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const Login = () => {
  const { store, actions } = useContext(Context);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    const loginResult = actions.login(email, password)
    loginResult.then(result => {
      if (result === true) {
        navigate("/")
      }
      else alert("Have you register already?")
    })
  };

  return (

    <div>
      <h2>Login</h2>

      {(store.token && store.token != "" && store.token != undefined) ? "You are logged in with this token" + store.token :

        <form className="info-wrapper py-4 px-4 d-flex flex-column was-validated" onSubmit={handleSubmit}>
          <div className="form-group row d-flex justify-content-between px-0">
            <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
            </div></div>
          <div>
            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl" /> </span>
            <label>Email:</label>
            <input
              type="text"
              placeholder="email"
              required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control p-2 border-4"></input><div className="invalid-feedback">
              Mandatory field.
            </div>
          </div>
          <div>
            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-key" size="2xl" /> </span>
            <label>Password:</label>
            <input
              type="password"
              placeholder="password"
              required value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control p-2 border-4"></input><div className="invalid-feedback">
              Mandatory value.
            </div>
          </div>
          <div>
            <input type="submit" className="save-info btn btn-primary p-2 mt-3 mx-2" value="Login" />
          </div>
        </form>
      }
    </div>
  );
};