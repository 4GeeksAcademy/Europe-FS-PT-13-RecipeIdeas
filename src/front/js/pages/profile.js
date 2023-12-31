import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../js/store/appContext"
import { Form } from "../../js/component/form.js"
import RecipeCard from "../component/recipeCard.js";

import "../../styles/index.css"
import "../../styles/profile.css";


export const Profile = () => {

    const { store, actions } = useContext(Context)
    const [editDetails, setEditDetails] = useState(false) // Alternate between edit and save changes so that user can update his info when editDetails is true.

    const handleEditInfo = () => {
        setEditDetails(!editDetails)
    }

    const handleSubmit = (userDetails) => {
        actions.setUserDetails(userDetails)
        setEditDetails(false)
    }


    let myWidget = cloudinary.createUploadWidget({
        cloudName: process.env.CLOUD_NAME,
        uploadPreset: "users_avatar",
        cropping: true,
        croppingShowDimensions: true,
    },
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


    if (store.token && store.token != "" && store.token != undefined) {
        return (
            <div className="profile container my-5">
                <div className="user-data row d-flex justify-content-between p-1">

                    <div className="avatar col-sm-12 col-md-5 d-flex flex-column justify-content-center align-items-center">
                        <img
                            className="avatar img-fluid rounded-circle"
                            src={store.userDetails.avatar}
                            alt="Profile Picture"
                        />
                        <button className="profile-change-picture btn my-3 mx-auto p-2 text-white" onClick={handleUploadAvatar}> Change profile picture </button>
                    </div>

                    <div className="user-info col-sm-12 col-md-7 d-flex flex-column justify-content-start">
                        <div className="wrapper px-4 me-5">
                            <Form handleSubmit={handleSubmit} handleEditInfo={handleEditInfo} editDetails={editDetails} />
                        </div>
                    </div>
                </div>

                <div className="favourite-recipes container-fluid mt-5">
                    <h1 className="text-center display-6 mt-5 mb-4">Favourite Recipes</h1>
                    <div className="row container d-flex justify-content-around mx-auto">
                            {
                                store.favouriteRecipes ?
                                    store.favouriteRecipes.map((favRecipe, index) => {
                                        return <RecipeCard
                                                    key={index}
                                                    id={favRecipe.recipeExternalId}
                                                    title={favRecipe.recipeTitle}
                                                    image={favRecipe.recipeImage}
                                                    pricePerServing={favRecipe.recipeCost}
                                                    servings={favRecipe.recipeServings}
                                                    diets={favRecipe.recipeDiet}
                                                    readyInMinutes={favRecipe.recipePrepTime}
                                                />
                                    })
                                            
                                :
                                    ""
                            }
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="text-center mt-5">
            <h1>THIS IS A PROTECTED VIEW, PLEASE LOG IN TO SEE YOUR PROFILE</h1>
        </div>
    )
};
