import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import * as mdb from 'mdb-ui-kit';
import { RecipeCard } from "../component/recipeCard";


export const ResultsPage = () => {
    const { store, actions } = useContext(Context);
    const [cuisine, setCuisine] = useState();
    const [diet, setDiet] = useState();
    const [type, setType] = useState();
    const [minCalories, setMinCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(1000);





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

    const handleMinCaloriesChange = (e) => {
        const value = e.target.value;
        setMinCalories(value);
    };

    const handleMaxCaloriesChange = (e) => {
        const value = e.target.value;
        setMaxCalories(value);
    };


    return (
        <>
            <div>
                <div className="row p-5" style={{ backgroundColor: "#ffebbb" }}>
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
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="multi-range-field">
                            <label htmlFor="caloriesRange" className="mb-3">Calories Range: {minCalories} - {maxCalories} kcal</label>
                            <div className="d-flex justify-content-center align-items-center">
                                <input
                                    id="caloriesRange"
                                    className="multi-range form-range"
                                    type="range"
                                    min="0"
                                    max="1300"
                                    step="100"
                                    value={minCalories}
                                    onChange={handleMinCaloriesChange}
                                />
                                <input
                                    id="caloriesRange"
                                    className="multi-range form-range"
                                    type="range"
                                    min="1300"
                                    max="2600"
                                    step="100"
                                    value={maxCalories}
                                    onChange={handleMaxCaloriesChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" onClick={() => actions.getComplexSearch(cuisine, diet, type, ("minCalories=" + minCalories), ("maxCalories=" + maxCalories))}>Search</button>
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
            </div>
        </>
    )
}

