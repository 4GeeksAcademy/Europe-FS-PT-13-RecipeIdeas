import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";


export const ResultsPage = () => {
    const { store, actions } = useContext(Context);
    const [cuisine, setCuisine] = useState();
    const [diet, setDiet] = useState();
    const [type, setType] = useState();






    const handleCuisineSelect = (e) => {
        const selectedItem = e.target.value;
        setCuisine(selectedItem);
        console.log(selectedItem);
    }


    const handleDietSelect = (e) => {
        const selectedItem = e.target.value;
        setDiet(selectedItem);
        console.log(selectedItem);
    }

    const handleTypeSelect = (e) => {
        const selectedItem = e.target.value;
        setType(selectedItem);
        console.log(selectedItem);
    }


    return (
        <>
            <div className="container row p-5" style={{ backgroundColor: "#ffebbb" }}>
                <div className="col-sm-2 col-md-3 col-lg-4">
                    <select class="form-select " aria-label="Cuisine" onChange={handleCuisineSelect}>
                        <option value="">Select Cuisine:</option>
                        <option value="cuisine=italian">Italian</option>
                        <option value="cuisine=french">French</option>
                        <option value="cuisine=japanese">Japanese</option>
                        <option value="cuisine=chinese">Chinese</option>
                        <option value="cuisine=mexican">Mexican</option>
                    </select>
                </div>
                <div className="col-sm-2 col-md-3 col-lg-4">
                    <select class="form-select " aria-label="Cuisine" onChange={handleDietSelect}>
                        <option value="">Select Diet:</option>
                        <option value="diet=vegetarian">Vegetarian</option>
                        <option value="diet=vegan">Vegan</option>
                        <option value="diet=pescatarian">Pescatarian</option>
                        <option value="diet=paleo">Paleo</option>
                        <option value="diet=primal">Primal</option>
                    </select>
                </div>
                <div className="col-sm-2 col-md-3 col-lg-4">
                    <select class="form-select " aria-label="Cuisine" onChange={handleTypeSelect}>
                        <option value="">Select Meal Type:</option>
                        <option value="type=main course">Main Course</option>
                        <option value="type=appetizer">Appetizer</option>
                        <option value="type=side dish">Side Dish</option>
                        <option value="type=dessert">Dessert</option>
                        <option value="type=breakfast">Breakfast</option>
                    </select>
                </div>
            </div>
            <div className="container row">
                <div className="col-sm-2 col-md-3 col-lg-4">
                    <form class="multi-range-field">
                        <input id="multi6" class="multi-range" type="range" />
                    </form>
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary" onClick={() => actions.getComplexSearch(cuisine, diet, type)}>Search</button>
            </div>
            <div className="container d-flex justify-content-center">
                <ul className="container row" style={{ listStyleType: "none" }}>
                    {store.filteredRecipes.map((p, index) => {
                        return (
                            <RecipeCard
                                key={index}
                                title={p.title}
                                image={p.image}
                                pricePerServing={p.pricePerServing}
                                servings={p.servings}
                                diets={p.diets}
                                readyInMinutes={p.readyInMinutes}
                                className="col-4"
                            />
                        );
                    })}
                </ul>
            </div>
        </>
    )
}

