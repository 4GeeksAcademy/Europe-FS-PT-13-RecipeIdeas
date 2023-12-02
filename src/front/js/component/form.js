import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../js/store/appContext.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
        <form className="info-wrapper py-4 px-4 d-flex flex-column was-validated" onSubmit={props.handleSubmit}>

            <div className="form-group row d-flex justify-content-between px-0">
                <div className="col-sm-12 col-md-12 col-lg-6 mb-2">
                    <label htmlFor="first-name" className="mb-1"> First Name </label>
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

                <div className="col-sm-12 col-md-12 col-lg-6 mb-2">
                    <label htmlFor="last-name" className="form-label mb-1"> Last Name </label>
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
                <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                    <label htmlFor="email" className="form-label mb-1"> Email </label>
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
                    <label htmlFor="linkedin" className="mb-1"> {userDetails.linkedIn ? "LinkedIn" : ""} </label>
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
                    <label htmlFor="github" className="form-label mb-1"> {userDetails.github ? "Github" : ""} </label>
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
                        <button className="save-info btn btn-success p-2 mt-3 mx-2" onClick={event => props.handleSubmit(userDetails)}>Save changes</button>
                        <button className="cancel-info btn btn-danger p-2 mt-3" onClick={handleCancel}>Cancel</button>
                    </div>
                    :
                    <button className="edit-info btn btn-danger p-2 mt-3" onClick={props.handleEditInfo}>Edit details</button>
            }
        </form>
    );
};