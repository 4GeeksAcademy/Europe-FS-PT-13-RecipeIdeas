import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";


export const ResultsPage = () => {
    const { store, actions } = useContext(Context);
    const [example, setExample] = useState();


    useEffect(() => {
        actions.getComplexSearch()
        const storeSearchResults = store.complexSearchResults
        setExample(storeSearchResults)

        console.log("Store", store.searchParams)
    }, []);


    	const handleCuisineSelect = (e) => {
    		const selectedCuisine = e.target.value;
    		setCuisineFilter(selectedCuisine);
    		console.log(selectedCuisine);
    	}

    // onClick={()=>actions.getComplexSearch(cuisineFilter)}

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
                
            </div>
            <div>
                <p>{example}</p>
            </div>
        </>
    )
}


