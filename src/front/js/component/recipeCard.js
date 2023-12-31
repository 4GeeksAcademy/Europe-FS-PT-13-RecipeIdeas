import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/recipeCard.css"


export const RecipeCard = (props) => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context)
	const [isFavorite, setIsFavorite] = useState(false);
	const [recipeDetails, setRecipeDetails] = useState({})


	const toggleFavorite = () => {
		if (store.token && store.token !== "") {
			isFavorite ?
				actions.removeFavourite(recipeDetails)
				:
				actions.addFavourite(recipeDetails)

			setIsFavorite(!isFavorite);
		}
	};


	useEffect(() => {

		setRecipeDetails({
			id: props.id,
			image: props.image,
			title: props.title,
			servings: props.servings,
			prepTime: props.readyInMinutes,
			cost: props.pricePerServing,
			diet: props.diets,
		})

		if (store.favouriteRecipes) {
			setIsFavorite(store.favouriteRecipes.some(recipe => recipe.recipeExternalId == props.id))
		}

	}, []);



	const totalRecipePrice = (pricePerServing, servings) => {
		let price = pricePerServing * servings;
		price = Math.round(price / 100);

		if (price <= 5) {
			return "€"
		}
		else if (price <= 10) {
			return "€€"

		}
		else if (price <= 15) {
			return "€€€"
		}

		return "€€€€"
	}

	const dietDisplay = () => {
		if (props.diets.length === 0) {
			return "Omnivore";
		}
		return props.diets.join(", ").replace(/\b\w/g, l => l.toUpperCase());
	};


	const handleGoToRecipe = () => {
		navigate("/recipe/" + recipeDetails.id)
	}

	return (
		<li className="col-sm-8 col-md-6 col-lg-4 mb-4" style={{ listStyleType: "none" }}>
			<div className="card d-flex flex-column justify-content-between shadow">
				
				<div className="row card-title d-flex justify-content-between px-3 py-3">
					<div className="col-sm-10 col-md-10 col-lg-10 my-auto">
						<h5 className="card-title-text mb-0">{recipeDetails.title}</h5>
					</div>

					<div className="col-sm-2 col-md-2 col-lg-2 d-flex align-items-center ps-0 pe-4">
						<i onClick={toggleFavorite} className={`fa${isFavorite ? 's' : 'r'} fa-star fa-2x`} data-bs-toggle={!store.token || store.token === undefined ? "modal" : ""} data-bs-target={!store.token || store.token === undefined ? "#favouritesModal" : "#"}></i>
					</div>

				</div>

				<img src={recipeDetails.image} className="card-img-top" alt="Recipe Image" />
				<div className="card-body d-flex flex-column justify-content-around my-3 py-0">
					<div className="row d-flex justify-content-center text-center">
						<div className="col-sm-12 col-md-5 col-lg-5">
							<p className="mt-1 mb-0"><i className="fas fa-utensils fa-lg me-1"></i> {recipeDetails.servings} Serving(s)</p>
						</div>

						<div className="col-sm-12 col-md-5 col-lg-5 mb-2">
							<p className="mt-1 mb-0 ms-2"><i className="fa-solid fa-hand-holding-dollar fa-lg me-1"></i> {totalRecipePrice(recipeDetails.cost, recipeDetails.servings)}</p>
						</div>
					</div>

					<div className="row d-flex justify-content-center text-center mb-2">
						<div className="col-sm-12 col-md-5 col-lg-5">
							<p className="mt-1 mb-0"><i className="fa-solid fa-clock fa-lg me-1"></i> {recipeDetails.prepTime} Minutes</p>
						</div>
					</div>

					<div className="row d-flex justify-content-center text-center">
						<div className="col-sm-12 col-md-12 mb-0">
							<p className="mb-0 mx-2"><i className="fas fa-apple-alt fa-lg me-1"></i> {dietDisplay()}</p>
						</div>
					</div>
				</div>

				<div className="card-footer align-items-end">
					<button type="button" className="btn w-100 text-white fs-5" onClick={handleGoToRecipe}>Go to Recipe</button>
				</div>
			</div>

			{/* MODAL TO BE DISPLAYED WHEN USER SELECTS FAVOURITE AND IS NOT LOGGED IN.*/}

			<div className="modal fade" id="favouritesModal" tabIndex="-1" aria-labelledby="favouritesModalLabel" aria-hidden={true} >
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="exampleModalLabel">Login to add favourites</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							In order to add favourite recipes, you must be logged in. If you don't have an account yet, Sign Up.
						</div>
						<div className="modal-footer">
							<Link to="/signup">
								<button type="button" className="btn btn-success" data-bs-dismiss="modal">Sign Up</button>
							</Link>

							<Link to="/login">
								<button type="button" className="btn btn-success" data-bs-dismiss="modal">Login</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</li >
	);
};

export default RecipeCard;