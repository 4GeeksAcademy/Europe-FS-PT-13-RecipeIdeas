import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";
import { IngredientCheckBox } from "../component/ingredientCheckbox";
import { TailSpin } from "react-loader-spinner"


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
    const [showGreeting, setShowGreeting] = useState(true);
    const [ingredientList, setIngredientList] = useState(["tomato", "Cheese", "Avocado", "pasta", "Pork", "Chicken", "Beef", "Eggs", "Tuna", "Beans", "Rice", "Mushrooms"]);
    const [loading, setLoading] = useState(false);



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
        setShowGreeting(false);
    };


    const handleLoadMore = () => {
        setResultsLoaded((prevResultsLoaded) => prevResultsLoaded + 12);
        actions.getComplexSearch(cuisine, diet, type, minCalories, maxCalories, includedIngredients, resultsLoaded);
    };


    useEffect(() => {
        setShowGreeting(true);
    }, []);

    return (
        <>
            <div className="container rounded-3 mt-4" style={{ backgroundColor: "#e0ffcd" }}>
                <div className="row p-5">
                    <h3 className="text-center mb-4">Filter Options:</h3>
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
                <div className="container row">
                    <h4 className="text-center mb-4">Included Ingredients:</h4>
                    {ingredientList.map((p, index) => {
                        return (
                            <IngredientCheckBox
                                ingredient={p}
                                ingredientCapital={p.charAt(0).toUpperCase() + p.slice(1)}
                                handFunction={handleIngredientChange}
                            />
                        )
                    })}
                </div>
                <div className="d-flex justify-content-center mt-3 pb-3">
                    <button type="button" className="btn btn-primary " onClick={handleSearch}>Search</button>
                </div>

            </div>


            <div className="container d-flex justify-content-center">
                <div className="text-center">
                    {showGreeting && (
                        <h3 className="mt-3">Feeling hungry for something specific? Try filtering through some of our options!</h3>
                    )}

                    {store.filteredRecipes.length > 0 && (
                        <>
                            <ul className="container row justify-content-center">
                                {store.filteredRecipes.slice(0, resultsLoaded).map((p, index) => (
                                    <RecipeCard
                                        key={index}
                                        title={p.title}
                                        image={p.image}
                                        pricePerServing={p.pricePerServing}
                                        servings={p.servings}
                                        diets={p.diets}
                                        readyInMinutes={p.readyInMinutes}
                                        id={p.id}
                                        className="col-4"
                                    />
                                ))}
                            </ul>
                            {store.filteredRecipes.length > resultsLoaded && (
                                <div className="row mt-3">
                                    <div className="col-md-6 mx-auto">
                                        <button type="button" className="btn btn-secondary" onClick={handleLoadMore}>
                                            Load More
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {!store.isLoading && store.filteredRecipes.length === 0 && !showGreeting && (
                        <h3 className="text-center mt-3">Oops, looks like we don't have anything like that!</h3>
                    )}
                </div>
            </div>
        </>
    );
};

