import React from "react";
import { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/forms.css";

export const Login = () => {
    const { store, actions } = useContext(Context);

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const loginResult = actions.login(email, password)
        loginResult.then(result => {
            console.log(result)
            if (result === true) {
                navigate("/")
            }
            else alert("Have you register already? If so check if your email and password are correct.")
        })
    };

    return (
        <div>
            
            <form className="info-wrapper  login-wrapper container w-50  d-flex flex-column was-validated" onSubmit={handleSubmit}>
            <h2>Login</h2>
                {
                    (store.token && store.token != "" && store.token != undefined) ? 
                    
                    <p className="pt-2 my-4 text-white text-center fs-2"> Have are already logged in </p>
                    :
                    <div>
                        <div className="row d-flex mt-5 justify-content-center">
                            <div className="form-group col-12">

                                <div className="input-group">
                                    <span className="form-input-icon ps-3 py-0 my-0"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl" /> </span>
                                    <input type="email" placeholder="Enter your email." required value={email}
                                        onChange={(e) => setEmail(e.target.value)} className="form-control p-2 border-4">
                                    </input>

                                    {/*<div className="invalid-feedback">
                                            Mandatory field.
                                    </div>*/}
                                </div>

                                <div className="input-group mt-3">
                                    <span className="form-input-icon ps-3"> <FontAwesomeIcon icon="fa-solid fa-key" size="2xl" /> </span>
                                    <input
                                        type="password" placeholder="Enter your password." required value={password}
                                        onChange={(e) => setPassword(e.target.value)} className="form-control p-2 border-4">
                                    </input>

                                    {/*<div className="invalid-feedback">
                                            Mandatory value.
                                    </div>*/}
                                </div>
                            </div>
                        </div>

                        <div className="row mx-auto mt-5 pb-4 d-flex justify-content-center text-center">
                            <span>
                                <button type="submit" className="save-info btn-lg btn-success"> Login </button>
                            </span>
                            <p></p>
                            <p className="pt-2 mb-0 text-white fs-5"> Have you registered already? <Link to="/signup" className="text-primary">Sign up</Link></p>
                        </div>
                    </div>
                }
            </form>
            </div>
    );
};