import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../js/store/appContext.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../styles/forms.css";

export const Form = (props) => {

    const { store, actions } = useContext(Context)
    const [userDetails, setUserDetails] = useState(store.userDetails)

    const handleCancel = () => {
        actions.getUserDetails()
        setEditDetails(false)
    }

    useEffect(() => {
        setUserDetails(store.userDetails)
    }, [store.userDetails])

    return (
        <form className="info-wrapper profile-wrapper py-4 px-4 d-flex flex-column was-validated" onSubmit={props.handleSubmit}>
            <h1 className="display-5 text-center mb-3"> <span className="profile-form-text text-white fw-bolder">{`${store.userDetails.name ? store.userDetails.name : ""} ${store.userDetails.lastName ? store.userDetails.lastName : ""}`}</span> </h1>
            <div className="form-group row d-flex justify-content-center px-0">
                <div className="col-sm-12 col-md-12 col-lg-7 mb-3">
                    <label htmlFor="first-name" className="mb-1"> <span className="text-white">First Name</span> </label>
                    {
                        props.editDetails ?
                            <div className="input-group has-validation">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>

                                <input id="first-name" type="text" required value={userDetails.name} onChange={(event) => setUserDetails({ ...userDetails, 'name': event.target.value })} className="form-control p-2 border-4"></input>
                                <div className="invalid-feedback">
                                    Provide a valid first name.
                                </div>
                            </div>
                            :
                            <div className="d-flex">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
                                <div id="first-name" className="form-input p-2 w-100">{userDetails.name}</div>
                            </div>
                    }
                </div>

                <div className="col-sm-12 col-md-12 col-lg-7 mb-3">
                    <label htmlFor="last-name" className="form-label mb-1"> <span className="text-white">Last Name</span> </label>
                    {
                        props.editDetails ?
                            <div className="input-group has-validation">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-people-group" size="2xl" /> </span>
                                <input id="last-name" type="text" value={userDetails.lastName} onChange={(event) => setUserDetails({ ...userDetails, 'lastName': event.target.value })} className="form-control p-2 border-4"></input>
                                <div className="invalid-feedback">
                                    Provide a valid last name.
                                </div>
                            </div>
                            :
                            <div className="d-flex">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-people-group" size="2xl" /> </span>
                                <div id="first-name" className="form-input p-2 w-100">{userDetails.lastName}</div>
                            </div>
                    }
                </div>

                {/*<div className="col-sm-12 col-md-12 col-lg-4 mb-2">
                    <label htmlFor="username" className="form-label mb-1">Username</label>
                    {
                        props.editDetails ?
                            <div className="input-group has-validation">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-at" size="2xl" /> </span>

                                <input id="username" type="text" value={userDetails.username} onChange={(event) => setUserDetails({ ...userDetails, 'username': event.target.value })} className="form-control p-2 border-4"></input>
                                <div className="invalid-feedback">
                                    Provide a valid username.
                                </div>
                            </div>
                            :
                            <div className="d-flex">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-at" size="2xl" /> </span>
                                <div id="username" className="form-input p-2 w-100">{userDetails.username}</div>
                            </div>
                    }
                </div>*/}
            </div>


            <div className="form-group row d-flex justify-content-center px-0">
                <div className="col-md-12 col-lg-10 col-xl-7">
                    <label htmlFor="email" className="form-label"> <span className="text-white">Email</span> </label>
                    {
                        props.editDetails ?
                            <div className="input-group has-validation">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl" /> </span>
                                <input id="email" type="email" disabled value={userDetails.email} onChange={(event) => setUserDetails({ ...userDetails, 'email': event.target.value })} className="form-control p-2 border-4 border-success bg-white"></input>
                                <div className="invalid-feedback" htmlFor="email">
                                    Provide a valid email.
                                </div>
                            </div>
                            :
                            <div className="d-flex">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl" /> </span>
                                <div id="email" className="form-input p-2 w-100">{userDetails.email}</div>
                            </div>
                    }
                </div>
            </div>

            <div className="form-group row d-flex justify-content-lg-center justify-content-xxl-between px-0">
                <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                    <label htmlFor="linkedin" className="mb-1"> <span className="text-white">{userDetails.linkedIn ? "LinkedIn" : ""}</span> </label>
                    {
                        props.editDetails ?
                            <div className="input-group has-validation">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-linkedin" size="2xl" /> </span>
                                <input id="linkedin" type="text" value={userDetails.linkedIn} onChange={(event) => setUserDetails({ ...userDetails, 'linkedIn': event.target.value })} className="form-control p-2 border-4"></input>
                                <div className="invalid-feedback">
                                    Provide a valid LinkedIn URL.
                                </div>
                            </div>
                            :
                            userDetails.linkedIn ?
                                <div className="d-flex">
                                    <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-linkedin" size="2xl" /> </span>
                                    <div id="linkedin" className="form-input p-2 w-100">
                                        <a href={userDetails.linkedIn} target="_blank">{userDetails.linkedIn}</a>
                                    </div>
                                </div>
                            :
                                ""

                    }
                </div>

                <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                    <label htmlFor="github" className="form-label mb-1"> <span className="text-white">{userDetails.github ? "Github" : ""}</span> </label>
                    {
                        props.editDetails ?
                            <div className="input-group has-validation">
                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-github" size="2xl" /> </span>
                                <input id="github" type="text" value={userDetails.github} onChange={(event) => setUserDetails({ ...userDetails, 'github': event.target.value })} className="form-control p-2 border-4"></input>
                                <div className="invalid-feedback">
                                    Provide a valid Github URL.
                                </div>
                            </div>
                            :
                            userDetails.github ?
                                <div className="d-flex">
                                    <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-github" size="2xl" /> </span>
                                    <div id="github" className="form-input p-2 w-100">
                                        <a href={userDetails.github} target="_blank">{userDetails.github}</a>
                                    </div>
                                </div>
                            :
                                ""
                    }
                </div>
            </div>

            {   // Conditionl rendering for showing change info or save the updated info depending on the state.
                props.editDetails ?
                    <div className="d-flex justify-content-end">
                        <button className="profile-form-save btn p-2 mt-3 mx-2" onClick={event => props.handleSubmit(userDetails)}> <span className="text-white">Save changes</span></button>
                        <button className="profile-form-cancel btn p-2 mt-3" onClick={handleCancel}> <span className="text-white">Cancel</span> </button>
                    </div>
                    :
                    <button className="profile-form-edit btn p-2 mt-3" onClick={props.handleEditInfo}> <span className="text-white">Edit details</span> </button>
            }
        </form>
    );
};