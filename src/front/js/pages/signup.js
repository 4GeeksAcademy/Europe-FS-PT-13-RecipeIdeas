import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import "../../styles/forms.css";

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
            else {
                alert("The email you provided is already taken.")
            }
        })
    };


    return (

        <form className="info-wrapper signup-wrapper container w-50 mt-2 py-auto py-5 d-flex flex-column was-validated" onSubmit={handleSubmit}>
           <h2 className="text-white">Signup</h2>
            <div className="row d-flex mt-5 justify-content-center">
                <div className="form-group col-12">
                    <div className="input-group">
                        <span className="form-input-icon ps-3 py-0 my-0"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
                        <input type="text" name="name" required value={signName} placeholder="Enter your first name."
                            onChange={(e) => setSignName(e.target.value)} className="form-control p-2 border-4">
                        </input>

                        {/*<div className="invalid-feedback">
                                Please provide a name.
                        </div>*/}
                    </div>

                    <div className="input-group mt-3">
                        <span className="form-input-icon ps-3"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="xl" /> </span>
                        <input
                            type="email" name="email" required value={signEmail} placeholder="Enter your email."
                            onChange={(e) => setSignEmail(e.target.value)} className="form-control p-2 border-4">
                        </input>

                        {/*<div className="invalid-feedback">
                                Please provide a e-mail.
                        </div>*/}
                    </div>

                    <div className="input-group mt-3">
                        <span className="form-input-icon ps-3"> <FontAwesomeIcon icon="fa-solid fa-key" size="xl" /> </span>
                        <input
                            type="password" name="password" required value={signPassword} placeholder="Enter your password."
                            onChange={(e) => setSignPassword(e.target.value)} className="form-control p-2 border-4">
                        </input>

                        {/*<div className="invalid-feedback">
                                Please insert your secret password.
                        </div>*/}
                    </div>
                </div>
            </div>

            <div className="row mx-auto mt-5 pb-4 d-flex justify-content-center text-center">
                <div>
                    <button type="submit" className="signup-btn btn px-4 py-2 text-white">Sign Up</button>
                </div>
                <p className="login-redirect mb-0 mt-3 py-1 text-white fs-5">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
            </div>
        </form>
    );
};

