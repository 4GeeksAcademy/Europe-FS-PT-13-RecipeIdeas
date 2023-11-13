import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const SimilarRecipes = (similarRecipesSimple) => {

    const { store, actions } = useContext(Context);
    const [similarRecipesInfo, setSimilarRecipesInfo] = useState([])

    let recipeInfo = []

    useEffect(() => {

        similarRecipesSimple.similarRecipesSimple.map( async (recipe, index) => {
            recipeInfo.push( await actions.getRecipeInformation(recipe.id) )
            //setSimilarRecipesInfo( [...similarRecipesInfo, await actions.getRecipeInformation(recipe.id)] )
            console.log("RECIPE INFO INSIDE", recipeInfo)
        })

    }, [])

    useEffect(() => {
        setSimilarRecipesInfo( [...similarRecipesInfo, recipeInfo] )
    }, [recipeInfo])

    console.log("HERE", recipeInfo, similarRecipesInfo)
    return (
        <div className="row mt-5 d-flex flex-column justify-content-center text-center">
            <span className="pb-3 fs-3 pt-3">Similar Recipes</span>
            {console.log(similarRecipesInfo)}
            {
                similarRecipesInfo ?
                    similarRecipesInfo.forEach((recipe, index) => {
                        <RecipeCard
                            key={index}
                            title={recipe.title}
                            image={recipe.image}
                            pricePerServing={recipe.pricePerServing}
                            servings={recipe.servings}
                            diets={recipe.diets}
                            readyInMinutes={recipe.readyInMinutes}
                        />
                    })
                    :
                    console.log("NOTHING")
            }
        </div>
    )

};

export default SimilarRecipes;