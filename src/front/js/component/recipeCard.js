import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const RecipeCard = (props) => {

	const [isFavorite, setIsFavorite] = useState(false);
	const [recipe, setRecipe] = useState();
	const [euros, setEuros] = useState("");
	const [diets, setDiets] = useState("Omnivore");

	const { store, actions } = useContext(Context);
    const { randomRecipes } = store;




	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	useEffect(() => {
		actions.getRandomRecipe(totalRecipePrice, dietDisplay, setRecipe)
		console.log("here's the random recipes array from the store in the actual component")
		console.log(randomRecipes)
	}, []);

	const totalRecipePrice = (recipeData) => {
		if (!recipeData) {
			return null;
		}
		let price = recipeData.recipes[props.index]?.pricePerServing * recipeData.recipes[props.index]?.servings;
		price = Math.round(price / 100);
		console.log(price);

		if (price <= 5) {
			setEuros("€")
		}
		else if (price <= 10) {
			setEuros("€€")

		}
		else if (price <= 15) {
			setEuros("€€€")
		}
		else {
			setEuros("€€€€")
		}
	}

	const dietDisplay = (recipeData) => {
		if (recipeData?.recipes[props.index]?.diets.length === 0) {
			setDiets("Omnivore");
		} else {
			setDiets(recipeData?.recipes[props.index]?.diets.join(", "));
		}
	};




	return (
		<li className="col-sm-3 col-md-3 col-lg-3 me-2">
			<div className="border mt-4 rounded-top">
				<div className="row">
					<div className="col-sm-6 col-md-6 col-lg-9">
						<h5 className="m-2">{recipe?.recipes[props.index]?.title}</h5>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-3 d-flex align-items-center">
						<i onClick={toggleFavorite} className={`fa${isFavorite ? 's' : 'r'} fa-heart fa-2x`}></i>
					</div>
				</div>
				<img src={recipe?.recipes[props.index]?.image} className="card-img-top" alt="Recipe Image" />
				<div className="row">
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i class="fas fa-utensils fa-lg"></i> {recipe?.recipes[props.index]?.servings} servings</p>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i class="far fa-clock fa-lg"></i> {recipe?.recipes[props.index]?.readyInMinutes} minutes</p>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i class="fas fa-coins fa-lg"></i> {euros}</p>
					</div>
					<div />
					<div className="d-flex justify-content-center">
						<p className="mt-1 ms-2"><i class="fas fa-apple-alt fa-lg"></i> {diets}</p>
					</div>
					<div className="d-flex justify-content-center">
						<button type="button" class="btn btn-primary w-100">Go to Recipe</button>
					</div>
				</div>
			</div >
		</li>
	);
};

export default RecipeCard;