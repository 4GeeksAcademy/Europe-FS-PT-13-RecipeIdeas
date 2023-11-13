import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";


export const ResultsPage = () => {
    const { store, actions } = useContext(Context);
    const [cuisine, setCuisine] = useState();
    const [diet, setDiet] = useState();
    const [type, setType] = useState();
    const [minCalories, setMinCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(1300);
    const [prepTime, setPrepTime] = useState(10);
    const [includedIngredients, setIncludedIngredients] = useState([]);
    const [resultsLoaded, setResultsLoaded] = useState(12);



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


    const handlePrepTimeChange = (e) => {
        const value = e.target.value;
        setPrepTime(value);
    };

    const handleIngredientChange = (e) => {
        const ingredient = e.target.value;

        if (e.target.checked) {
            setIncludedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
        } else {
            setIncludedIngredients((prevIngredients) => prevIngredients.filter((item) => item !== ingredient));
        }
    };

    const handleSearch = () => {
        setResultsLoaded(12);
        actions.getComplexSearch(cuisine, diet, type, minCalories, maxCalories, includedIngredients, resultsLoaded);
    };

    const handleLoadMore = () => {
        setResultsLoaded((prevResultsLoaded) => prevResultsLoaded + 12);
        actions.getComplexSearch(cuisine, diet, type, minCalories, maxCalories, includedIngredients, resultsLoaded);
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
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <label for="prepTimeRange" className="form-label">Preparation Time: {prepTime} minutes </label>
                        <div className="d-flex justify-content-center align-items-center">
                            <input type="range" className="form-range" min="5" max="50" step="5" value={prepTime} onChange={handlePrepTimeChange} id="prepTimeRange" />
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=tomato" id="tomato" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="tomato">
                                Tomato
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=cheese" id="cheese" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="cheese">
                                Cheese
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=avocado" id="avocado" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="avocado">
                                Avocado
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=pasta" id="pasta" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="pasta">
                                Pasta
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=pork" id="pork" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="pork">
                                Pork
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=chicken" id="chicken" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="chicken">
                                Chicken
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=beef" id="beef" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="beef">
                                Beef
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=eggs" id="eggs" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="eggs">
                                Eggs
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=tuna" id="tuna" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="tuna">
                                Tuna
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=beans" id="beans" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="beans">
                                Beans
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=rice" id="rice" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="rice">
                                Rice
                            </label>
                        </div>
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=mushrooms" id="mushrooms" onChange={handleIngredientChange} />
                            <label className="form-check-label" for="mushrooms">
                                Mushrooms
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" class="btn btn-primary" onClick={handleSearch}>Search</button>
            </div>
            <div className="row mt-3 justify-content-center">
                <div className="col-md-12">
                    {store.isLoading && (
                        <p>Feeling hungry for something specific? Try filtering through some of our options!</p>
                    )}

                    {!store.isLoading && store.filteredRecipes.length === 0 && (
                        <p>Oops, looks like we don't have anything like that!</p>
                    )}

                    {!store.isLoading && store.filteredRecipes.length > 0 && (
                        <>
                            {/* Display the loaded recipe cards */}
                            <ul className="container row" style={{ listStyleType: "none" }}>
                                {store.filteredRecipes.slice(0, resultsLoaded).map((p, index) => (
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
                                ))}
                            </ul>
                            {store.filteredRecipes.length > resultsLoaded && (
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <button type="button" className="btn btn-secondary" onClick={handleLoadMore}>
                                            Load More
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

