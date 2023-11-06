import React, { useState, useContext } from "react";
import { Context } from "../../js/store/appContext"
import { Form } from "../../js/component/form.js"

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

    const handleUploadAvatar = (event) => {
        event.preventDefault()
        actions.setProfilePicture("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.2389hs1Tuoxh-yRPP430oQHaEK%26pid%3DApi&f=1&ipt=8eb07f6e54740204beb04f9102538ae8348d2bde7b73aa2d9097c4d5a9c00b98&ipo=images")
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
