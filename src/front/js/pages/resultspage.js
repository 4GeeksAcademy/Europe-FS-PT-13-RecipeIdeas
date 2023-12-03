import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";
import { Spinner} from "../component/Spinner";



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
            console.log(ingredient);
        } else {
            setIncludedIngredients((prevIngredients) => prevIngredients.filter((item) => item !== ingredient));
        }
    };

    const handleSearch = () => {
        setResultsLoaded(12);
        actions.getComplexSearch(cuisine, includedIngredients, diet, type, ("minCalories=" + minCalories), ("maxCalories=" + maxCalories), ("maxReadyTime=" + prepTime), resultsLoaded);
        setShowGreeting(false);
    };


    const handleLoadMore = () => {
        setResultsLoaded((prevResultsLoaded) => prevResultsLoaded + 12);
        actions.getComplexSearch(cuisine, includedIngredients, diet, type, ("minCalories=" + minCalories), ("maxCalories=" + maxCalories), ("maxReadyTime=" + prepTime), resultsLoaded);

    };


    useEffect(() => {
        setShowGreeting(true);
        actions.clearResults()
    }, []);

    return (
        <>
            <div className="container rounded-3 mt-4">
                <h3 className="text-center my-2 display-4">Filter Options</h3>

                <div className="row p-4 d-flex justify-content-around">    
                    <div className="col-sm-6 col-md-4 mb-3">
                        <select className="form-select " aria-label="Cuisine" onChange={handleCuisineSelect}>
                            <option value="">Select Cuisine:</option>
                            <option value="cuisine=italian">Italian</option>
                            <option value="cuisine=french">French</option>
                            <option value="cuisine=japanese">Japanese</option>
                            <option value="cuisine=chinese">Chinese</option>
                            <option value="cuisine=mexican">Mexican</option>
                        </select>
                    </div>

                    <div className="col-sm-6 col-md-4 mb-3">
                        <select className="form-select " aria-label="Cuisine" onChange={handleDietSelect}>
                            <option value="">Select Diet:</option>
                            <option value="diet=vegetarian">Vegetarian</option>
                            <option value="diet=vegan">Vegan</option>
                            <option value="diet=pescatarian">Pescatarian</option>
                            <option value="diet=paleo">Paleo</option>
                            <option value="diet=primal">Primal</option>
                        </select>
                    </div>

                    <div className="col-sm-6 col-md-4 mb-3">
                        <select className="form-select " aria-label="Cuisine" onChange={handleTypeSelect}>
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
                    <div className="col-md-6 text-center mb-5">
                        <form className="multi-range-field">
                            <label htmlFor="caloriesRange" className="mb-2">Calories Range {minCalories} - {maxCalories} kcal</label>
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
                    <div className="col-md-6 text-center mb-5">
                        <label htmlFor="prepTimeRange" className="form-label mb-2">Preparation Time: {prepTime} minutes </label>
                        <div className="d-flex justify-content-center align-items-center">
                            <input type="range" className="form-range" min="5" max="50" step="5" value={prepTime} onChange={handlePrepTimeChange} id="prepTimeRange" />
                        </div>
                    </div>
                </div>

                <div className="container ms-2 ps-5 pb-5 rounded-pill shadow" style={{ backgroundColor: "#fdffcd" }}>
                    <h4 className="mb-4 mt-4 text-center display-6">Included Ingredients</h4>
                    <div className="row justify-content-center">
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=cheese" id="cheese" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="cheese">
                                Cheese
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=tomato" id="tomato" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="tomato">
                                Tomato
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=avocado" id="avocado" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="avocado">
                                Avocado
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=pasta" id="pasta" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="pasta">
                                Pasta
                            </label>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=pork" id="pork" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="pork">
                                Pork
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=chicken" id="chicken" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="chicken">
                                Chicken
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=beef" id="beef" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="beef">
                                Beef
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=eggs" id="eggs" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="eggs">
                                Eggs
                            </label>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=tuna" id="tuna" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="tuna">
                                Tuna
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=beans" id="beans" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="beans">
                                Beans
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=rice" id="rice" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="rice">
                                Rice
                            </label>
                        </div>

                        <div className="form-check col-3">
                            <input className="form-check-input" type="checkbox" value="includeIngredients=mushrooms" id="mushrooms" onChange={handleIngredientChange} />
                            <label className="form-check-label" htmlFor="mushrooms">
                                Mushrooms
                            </label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center mt-3 pb-3">
                    <button type="button" className="btn display-6 shadow-lg text-dark ps-5 pe-5 pt-3 pb-3 rounded-pill" style={{ backgroundColor: "#e0ffcd" }} onClick={handleSearch}>Search</button>
                </div>

            </div>


            <div className="container d-flex justify-content-center">
                <div className="text-center">
                    {showGreeting && (
                        <h3 className="mt-3">Feeling hungry for something specific? Try filtering through some of our options!</h3>
                    )}

                    {store.isLoading && (
                        <div className=" container d-flex justify-content-center mt-3">
                            <Spinner />
                        </div>
                    )}

                    <ul className="container row justify-content-center text-start mb-0">
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
                            />
                        ))}
                    </ul>

                    {store.filteredRecipes.length > resultsLoaded && (
                        <div className="row mt-0 mb-3">
                            <div className="col-md-6 mx-auto">
                                <button type="button" className="btn btn-secondary" onClick={handleLoadMore}>
                                    Load More
                                </button>
                            </div>
                        </div>
                    )}

                    {store.filteredRecipes.length === 0 && !showGreeting && (
                        <h3 className="text-center mt-3">Oops, looks like we don't have anything like that!</h3>
                    )}
                </div>
            </div>
        </>
    );
};

