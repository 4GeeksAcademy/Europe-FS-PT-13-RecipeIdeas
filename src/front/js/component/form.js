import React, { useState, useContext } from "react";
import Context from "../../js/store/flux.js"

export const Form = (handle, info) => {

    const context = useContext(Context)

    return(
        <form className="info-wrapper py-4 px-4 d-flex flex-column was-validated" onSubmit={props.handleSubmit}>

            <div className="form-group row d-flex justify-content-between px-0">
                <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
                    <label htmlFor="first-name" className="mb-1"> First Name</label>
                    {
                        info.editDetails ?
                        <div className="input-group has-validation">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
                            <input id="first-name" type="text" required value={info.firstName} onChange={(event) => setFirstName(event.target.value)} className="form-control p-2 border-4"></input>
                            <div className="invalid-feedback">
                                Provide a valid first name.
                            </div>
                        </div>
                        :
                        <div className="d-flex">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
                            <div id="first-name" className="form-input p-2 w-100">{info.firstName}</div>
                        </div>
                    }
                </div>

                <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
                    <label htmlFor="last-name" className="form-label mb-1"> Last Name</label>
                    {
                        info.editDetails ?
                        <div className="input-group has-validation">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-people-group" size="2xl" /> </span>
                            <input id="last-name" type="text" required value={lastName} onChange={(event) => setLastName(event.target.value)} className="form-control p-2 border-4"></input>
                            <div className="invalid-feedback">
                                Provide a valid last name.
                            </div>
                        </div>
                        :
                        <div className="d-flex">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-people-group" size="2xl" /> </span>
                            <div id="first-name" className="form-input p-2 w-100">{lastName}</div>
                        </div>
                    }
                </div>

                <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
                    <label htmlFor="username" className="form-label mb-1">Username</label>
                    {
                        info.editDetails ?
                        <div className="input-group has-validation">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-at" size="2xl" /> </span>
                            <input id="username" type="text" required value={username} onChange={(event) => setUsername(event.target.value)} className="form-control p-2 border-4"></input>
                            <div className="invalid-feedback">
                                Provide a valid username.
                            </div>
                        </div>
                        :
                        <div className="d-flex">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-at" size="2xl" /> </span>
                            <div id="username" className="form-input p-2 w-100">{username}</div>
                        </div>
                    }
                </div>
            </div>


            <div className="form-group row d-flex justify-content-center px-0">
                <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                    <label htmlFor="email" className="form-label mb-1"> Email </label>
                    {
                        info.editDetails ?
                        <div className="input-group has-validation">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl" /> </span>
                            <input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="form-control p-2 border-4"></input>
                            <div className="invalid-feedback" htmlFor="email">
                                Provide a valid email.
                            </div>
                        </div>
                        :
                        <div className="d-flex">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-envelope" size="2xl" /> </span>
                            <div id="email" className="form-input p-2 w-100">{email}</div>
                        </div>
                    }
                </div>
            </div>

            <div className="form-group row d-flex justify-content-lg-center justify-content-xxl-between px-0">
                <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                    <label htmlFor="linkedin" className="mb-1"> LinkedIn</label>
                    {
                        info.editDetails ?
                        <div className="input-group has-validation">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-linkedin" size="2xl" /> </span>
                            <input id="linkedin" type="text" value={linkedIn} onChange={(event) => setLinkedIn(event.target.value)} className="form-control p-2 border-4"></input>
                            <div className="invalid-feedback">
                                Provide a valid LinkedIn URL.
                            </div>
                        </div>
                        :
                        <div className="d-flex">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-linkedin" size="2xl" /> </span>
                            <div id="linkedin" className="form-input p-2 w-100">{linkedIn}</div>
                        </div>
                    }
                </div>

                <div className="col-md-12 col-lg-10 col-xl-6 mt-3">
                    <label htmlFor="github" className="form-label mb-1"> Github </label>
                    {
                        info.editDetails ?
                        <div className="input-group has-validation">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-github" size="2xl" /> </span>
                            <input id="github" type="text" value={github} onChange={(event) => setGithub(event.target.value)} className="form-control p-2 border-4"></input>
                            <div className="invalid-feedback">
                                Provide a valid Github URL.
                            </div>
                        </div>
                        :
                        <div className="d-flex">
                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-brands fa-github" size="2xl" /> </span>
                            <div id="github" className="form-input p-2 w-100">{github}</div>
                        </div>
                    }
                </div>
            </div>    

                {   // Conditionl rendering for showing change info or save the updated info depending on the state.
                    info.editDetails ?
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="save-info btn btn-danger p-2 mt-3 mx-2">Save changes</button>
                        <button className="cancel-info btn btn-danger p-2 mt-3" onClick={props.handleCancel}>Cancel</button>
                    </div>
                    :
                    <button className="edit-info btn btn-danger p-2 mt-3" onClick={props.handleEditInfo}>Edit details</button>
                }
        </form>
    );
};