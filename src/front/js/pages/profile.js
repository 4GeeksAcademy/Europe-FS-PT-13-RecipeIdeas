import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../styles/index.css"
import "../../styles/profile.css";


export const Profile = () => {

    const [editDetails, setEditDetails] = useState(false) // Alternate between edit and save changes so that user can update his info when editDetails is true.
    const [firstName, setFirstName] = useState("Afonso")
    const [lastName, setLastName] = useState("Bernardes")
    const [username, setUsername] = useState("afonso_bernardes")
    const [email, setEmail] = useState("afonso.duarte.bernardes@gmail.com")

    const handleEditInfo  = () => {
        setEditDetails(!editDetails)
    }

    const handleCancel  = () => {
        setEditDetails(false)
    }
    
    const handleSubmit  = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setEditDetails(false)
    }

    return (
        <div className="profile container-fluid border border-danger">
            <div className="user-data row d-flex justify-content-between p-1">

                <div className="avatar col-sm-12 col-md-4 d-flex flex-column justify-content-center text-center">
                    <img
                        className="avatar img-fluid img-thumbnail rounded-circle mx-auto"
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flistimg.pinclipart.com%2Fpicdir%2Fs%2F351-3519728_png-file-svg-default-profile-picture-free-clipart.png&f=1&nofb=1&ipt=20c41a225bc465c20f51d2a0a087db917768fa1eca77d811c1f1832fdd60def0&ipo=images"
                        alt="Profile Picture"
                    />
                    <button className="change-picture btn btn-danger my-2 mx-auto p-2">Change profile picture</button>
                </div>

                <div className="user-info col-sm-12 col-md-8 d-flex flex-column justify-content-center">
                    <div className="wrapper mx-auto px-4 w-100">
                        <h1 className="display-5">{`${firstName} ${lastName}`}</h1>

                        <form className="info-wrapper py-4 px-4 d-flex flex-column was-validated" onSubmit={handleSubmit}>

                            <div className="form-group row d-flex justify-content-between px-0">
                                <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
                                    <label htmlFor="first-name" className="mb-1"> First Name</label>
                                    {
                                        editDetails ?
                                        <div className="input-group has-validation">
                                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
                                            <input id="first-name" type="text" required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="form-control p-2 border-4"></input>
                                            <div className="invalid-feedback">
                                                Provide a valid first name.
                                            </div>
                                        </div>
                                        :
                                        <div className="d-flex">
                                            <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-person" size="2xl" /> </span>
                                            <div id="first-name" className="form-input p-2 w-100">{firstName}</div>
                                        </div>
                                    }
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-4 mb-2">
                                    <label htmlFor="last-name" className="form-label mb-1"> Last Name</label>
                                    {
                                        editDetails ?
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
                                        editDetails ?
                                        <div>
                                            <div className="input-group has-validation">
                                                <span className="form-input-icon"> <FontAwesomeIcon icon="fa-solid fa-at" size="2xl" /> </span>
                                                <input id="username" type="text" required value={username} onChange={(event) => setUsername(event.target.value)} className="form-control p-2 border-4"></input>
                                                <div className="invalid-feedback">
                                                    Provide a valid username.
                                                </div>
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

                            <div className="col-12 mt-2">
                                <label htmlFor="email" className="form-label mb-1"> Email </label>
                                {
                                    editDetails ?
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
                                        <div id="email" className="form-input py-2 px-3 w-100">{email}</div>
                                    </div>
                                }
                            </div>

                            {   // Conditionl rendering for showing change info or save the updated info depending on the state.
                                editDetails ?
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="save-info btn btn-danger p-2 mt-3 mx-2">Save changes</button>
                                    <button className="cancel-info btn btn-danger p-2 mt-3" onClick={handleCancel}>Cancel</button>
                                </div>
                                :
                                <button className="edit-info btn btn-danger p-2 mt-3" onClick={handleEditInfo}>Edit details</button>
                            }

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
