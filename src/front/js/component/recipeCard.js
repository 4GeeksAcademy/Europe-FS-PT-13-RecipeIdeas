import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const RecipeCard = (props) => {

	const { store, actions } = useContext(Context)
	const [ isFavorite, setIsFavorite ] = useState(false);
	const [ recipeDetails, setRecipeDetails ] = useState(null)
	// const [ euros, setEuros ] = useState("");
	// const [ diets, setDiets ] = useState("Omnivore");

	const toggleFavorite = () => {

		isFavorite ?
			actions.removeFavourite(recipeDetails)
		:
			actions.addFavourite(recipeDetails)

		setIsFavorite(!isFavorite);
	};



	useEffect(() => {	

		setRecipeDetails({
			id: null,
			title: props.title,
			servings: props.servings,
			prepTime: props.readyInMinutes,
			cost: totalRecipePrice(),
			diet: dietDisplay(),
		})

	  }, []);



	const totalRecipePrice = () => {
		let price = props.pricePerServing * props.servings;
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



	return (
		<li className="col-sm-3 col-md-3 col-lg-3 me-4">
			<div className="mt-4 rounded-top" style={{backgroundColor: "#ffcab0"}}>
				<div className="row">
					<div className="col-sm-6 col-md-6 col-lg-9">
						<h5 className="m-2">{recipeDetails.title}</h5>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-3 d-flex align-items-center">
						<i onClick={toggleFavorite} className={`fa${isFavorite ? 's' : 'r'} fa-heart fa-2x`}></i>
					</div>
				</div>
				<img src={props.image} className="card-img-top" alt="Recipe Image" />
				<div className="row">
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i className="fas fa-utensils fa-lg"></i> {recipeDetails.servings} servings</p>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i className="far fa-clock fa-lg"></i> {recipeDetails.prepTime} minutes</p>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i className="fas fa-coins fa-lg"></i> {recipeDetails.cost}</p>
					</div>
					<div />
					<div className="d-flex justify-content-center">
						<p className="mt-1 ms-2"><i className="fas fa-apple-alt fa-lg"></i> {recipeDetails.diet}</p>
					</div>
					<div className="d-flex justify-content-center">
						<button type="button" className="btn btn-primary w-100">Go to Recipe</button>
					</div>
				</div>
			</div >
		</li>
	);
};

export default RecipeCard;