import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";


export const RecipeCard = () => {

	const [isFavorite, setIsFavorite] = useState(false);
	const [recipe, setRecipe] = useState();
	const [euros, setEuros] = useState("");
	const [diets, setDiets] = useState("");




	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	const url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random"



	const getRecipe = () => {
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'X-RapidAPI-Key': 'f4a6409e03msh2513ad740baf8b9p13e32fjsn5d20d8842c5f',
				'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
			},
			body: JSON.stringify(),
		})
			.then(async (data) => {
				const response = await data.json();
				return response;
			})
			.then((data) => {
				console.log(data);
				setRecipe(data);
				totalRecipePrice(data);
			})
			.catch((error) => {
				console.error('There was a problem with the fetch operation:', error);
			});
	}

	useEffect(() => {
		getRecipe();
	}, []);

	const totalRecipePrice = (recipeData) => {
		if (!recipeData) {
			return null;
		}
		let price = recipeData.recipes[0]?.pricePerServing * recipeData.recipes[0]?.servings;
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
		else { setEuros("€€€€")
	}
	}



	return (
		<div className="border mt-4 rounded-top" style={{ width: "18rem" }}>
			<div className="row">
				<div className="col-9">
					<h5 className="m-2">{recipe?.recipes[0]?.title}</h5>
				</div>
				<div className="col-3 d-flex align-items-center">
					<i onClick={toggleFavorite} className={`fa${isFavorite ? 's' : 'r'} fa-heart fa-2x`}></i>
				</div>
			</div>
			<img src={recipe?.recipes[0]?.image} className="card-img-top" alt="Recipe Image" />
			<div className="">
				<p className="mt-1 ms-2">Serving: {recipe?.recipes[0]?.servings}</p>
				<p className="mt-1 ms-2">Total Cook Time: {recipe?.recipes[0]?.readyInMinutes} minutes</p>
				<p className="mt-1 ms-2">Price: {euros}</p>
				<p className="mt-1 ms-2">Diet: {Array.isArray(recipe?.recipes[0]?.diets) ? recipe?.recipes[0]?.diets.join(", ")  : "Omnivore"}</p>
				<button type="button" class="btn btn-primary w-100">Go to Recipe</button>
			</div>
		</div >
	);
};

export default RecipeCard;