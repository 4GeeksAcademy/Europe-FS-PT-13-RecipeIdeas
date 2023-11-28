import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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

        <form className="info-wrapper container py-4 mt-5 d-flex flex-column was-validated" onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-between mx-auto">
                <div className="form-group col-md-12 col-lg-10">
                    <div className="input-group">
                        <span className="form-input-icon ps-3 py-0 my-0"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
                        <input type="text" name="name" required value={signName} placeholder="Enter your first name."
                            onChange={(e) => setSignName(e.target.value)} className="form-control p-2 border-4">
                        </input>

                        <div className="invalid-feedback">
                            Please provide a name.
                        </div>
                    </div>

                    <div className="input-group mt-3">
                        <span className="form-input-icon ps-3"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="xl" /> </span>
                        <input
                            type="email" name="email" required value={signEmail} placeholder="Enter your email."
                            onChange={(e) => setSignEmail(e.target.value)} className="form-control p-2 border-4">
                        </input>

                        <div className="invalid-feedback">
                            Please provide a e-mail.
                        </div>
                    </div>

                    <div className="input-group mt-3">
                        <span className="form-input-icon ps-3"> <FontAwesomeIcon icon="fa-solid fa-key" size="xl" /> </span>
                        <input
                            type="password" name="password" required value={signPassword} placeholder="Enter your first password."
                            onChange={(e) => setSignPassword(e.target.value)} className="form-control p-2 border-4">
                        </input>

                        <div className="invalid-feedback">
                            Please insert your secret password.
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-5 d-flex justify-content-center">
                <div>
                    <button type="submit" className="save-info btn btn-primary">Sign Up</button>
                </div>

                <p className="mb-0">Already have an account? Please <Link to="/login">Login</Link>!</p>
            </div>
        </form>
    );
};

