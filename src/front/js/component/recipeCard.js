import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


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
		return props.diets.join(", ");
	};


	const handleGoToRecipe = () => {
		navigate("/recipe/" + recipeDetails.id)
	}


	const fontSizeTitle = Math.max(12, 24 - props.title.length / 5);

	return (
		<li className="col-sm-9 col-md-9 col-lg-3 me-4" style={{ listStyleType: "none" }}>
			<div className="mt-4 rounded-top d-flex flex-column justify-content-between shadow" style={{ backgroundColor: "#ffcab0", height: "425px" }}>
				<div className="row">

					<div className="col-sm-6 col-md-6 col-lg-9">
						<h5 className="m-2" style={{ fontSize: `${fontSizeTitle}px` }}>{recipeDetails.title}</h5>
					</div>

					<div className="col-sm-3 col-md-3 col-lg-3 d-flex align-items-center">
						<i onClick={toggleFavorite} className={`fa${isFavorite ? 's' : 'r'} fa-heart fa-2x`} data-bs-toggle={!store.token || store.token === undefined ? "modal" : ""} data-bs-target={!store.token || store.token === undefined ? "#favouritesModal" : "#"}></i>
					</div>

				</div>

				<img src={recipeDetails.image} className="card-img-top" alt="Recipe Image" style={{ objectFit: "cover", height: "150px" }} />
				<div className="m-2 rounded" style={{ backgroundColor: "#fdffcd" }}>
					<div className="row">
						<div className="col-sm-3 col-md-3 col-lg-4">
							<p className="mt-1 ms-2"><i className="fas fa-utensils fa-lg"></i> {recipeDetails.servings} servings</p>
						</div>

						<div className="col-sm-3 col-md-3 col-lg-4">
							<p className="mt-1 ms-2"><i className="far fa-clock fa-lg"></i> {recipeDetails.prepTime} minutes</p>
						</div>

						<div className="col-sm-3 col-md-3 col-lg-4">
							<p className="mt-1 ms-2"><i className="fas fa-coins fa-lg"></i> {totalRecipePrice(recipeDetails.cost, recipeDetails.servings)}</p>
						</div>
					</div>

					<div className="row">
						<div className="col-12 d-flex">
							<p className="mt-1 ms-2"><i className="fas fa-apple-alt fa-lg"></i> {dietDisplay()}</p>
						</div>
					</div>
				</div>

				<div className="d-flex flex-column align-items-end">
					<button type="button" className="btn w-100" style={{ backgroundColor: "#e0ffcd" }} onClick={handleGoToRecipe}>Go to Recipe</button>
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