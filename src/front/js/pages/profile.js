import React, { useState, useContext } from "react";
import { Context } from "../../js/store/appContext"
import { Form } from "../../js/component/form.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "../../styles/index.css"
import "../../styles/profile.css";



export const Profile = () => {

    const { store, actions } = useContext(Context)

    const [editDetails, setEditDetails] = useState(false) // Alternate between edit and save changes so that user can update his info when editDetails is true.

    const handleEditInfo = () => {
        setEditDetails(!editDetails)
    }

    const handleCancel = () => {
        setEditDetails(false)
    }
    
    const handleSubmit = (event) => {
        // flux.js -> setUserDetails()
        event.preventDefault()
        event.stopPropagation()
        setEditDetails(false)
    }
  

    let myWidget = cloudinary.createUploadWidget({
        cloudName: process.env.CLOUD_NAME, 
        uploadPreset: "users_avatar",
        sources: [ "local", "url"],
        cropping: true}, 
        (error, result) => { 
            if (!error && result && result.event === "success") { 
                console.log('Done! Here is the image info: ', result.info.url);
                actions.setProfilePicture(result.info.url)
            }
        }
    )

    const handleUploadAvatar = (event) => {
        event.preventDefault()
        myWidget.open();
    }

    return (
        <div className="profile container-fluid border border-danger">
            <div className="user-data row d-flex justify-content-between p-1">

                <div className="avatar col-sm-12 col-md-4 d-flex flex-column justify-content-center text-center">
                    <img
                        className="avatar img-fluid rounded-circle mx-auto"
                        src={store.userDetails.avatar}
                        alt="Profile Picture"
                    />
                    <button className="change-picture btn btn-danger my-2 mx-auto p-2" onClick={handleUploadAvatar}> Change profile picture </button>

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
