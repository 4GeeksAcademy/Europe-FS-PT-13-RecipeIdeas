import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { RecipeCard } from "../component/recipeCard"



export const SimilarRecipes = (props) => {

    const { store, actions } = useContext(Context);

    useEffect(() => {
        
    }, [store.similarRecipesInfo])

    return (
        <div className="row mt-5 d-flex justify-content-between text-center container-fluid">
            <span className="pb-3 fs-3 pt-3">Similar Recipes</span>
            {
                store.similarRecipesInfo ?
                    store.similarRecipesInfo.map((recipe, index) => {
                        return(
                            <RecipeCard
                                key={index}
                                id={recipe.id}
                                title={recipe.title}
                                image={recipe.image}
                                pricePerServing={recipe.pricePerServing}
                                servings={recipe.servings}
                                diets={recipe.diets}
                                readyInMinutes={recipe.readyInMinutes}
                            />
                        )   
                    })
                    :
                    console.log("NOTHING")
            }
        </div>
    )

};

export default SimilarRecipes;