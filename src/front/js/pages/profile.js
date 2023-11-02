import React, { useState, useContext } from "react";
import { Context } from "../../js/store/appContext"
import { Form } from "../../js/component/form.js"

import "../../styles/index.css"
import "../../styles/profile.css";


export const Profile = () => {

    const { store, actions } = useContext(Context)

    const [editDetails, setEditDetails] = useState(false) // Alternate between edit and save changes so that user can update his info when editDetails is true.
    /*
        const [firstName, setFirstName] = useState("Afonso")
        const [lastName, setLastName] = useState("Bernardes")
        const [username, setUsername] = useState("afonso_bernardes")

        const [email, setEmail] = useState("afonso.duarte.bernardes@gmail.com")
        const [linkedIn, setLinkedIn] = useState("https://www.linkedin.com/in/afonso-bernardes/")
        const [github, setGithub] = useState("https://github.com/AfonsoBernardes")
    */

    const handleEditInfo  = () => {
        setEditDetails(!editDetails)
    }

    const handleCancel  = () => {
        setEditDetails(false)
    }
    
    const handleSubmit  = (event) => {
        // flux.js -> setUserDetails()
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
                        <h1 className="display-5">{`${store.userDetails.firstName} ${store.userDetails.lastName}`}</h1>
                        <Form handleSubmit={handleSubmit} handleCancel={handleCancel} handleEditInfo={handleEditInfo} editDetails={editDetails} />
                    </div>
                </div>
            </div>
        </div>
    );
};
