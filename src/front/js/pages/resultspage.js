import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";


export const ResultsPage = () => {
    const { store, actions } = useContext(Context);
    const [cuisine, setCuisine] = useState();


    useEffect(() => {
        actions.getFilteredRecipes()
    }, [store.complexSearchIds]);


    const handleCuisineSelect = (e) => {
        const selectedCuisine = e.target.value;
        setCuisine(selectedCuisine);
        console.log(selectedCuisine);
    }


    return (
        <>
            <div className="container p-5 rounded" style={{ backgroundColor: "#ffebbb" }}>
                <select class="form-select" aria-label="Cuisine" onChange={handleCuisineSelect}>
                    <option value="">Select Cuisine:</option>
                    <option value="cuisine=italian">Italian</option>
                    <option value="cuisine=french">French</option>
                    <option value="cuisine=japanese">Japanese</option>
                </select>
            </div>
            <div>
                <button type="button" class="btn btn-primary" onClick={() => actions.getComplexSearch(cuisine)}>Search</button>
            </div>
            <div>
            </div>
        </>
    )
}

