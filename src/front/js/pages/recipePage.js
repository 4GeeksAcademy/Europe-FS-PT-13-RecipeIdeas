import React, { useState, useEffect, useContext } from "react";
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RecipeCard } from "../component/recipeCard";

import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/recipePage.css"

export const Recipe = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const [isFavorite, setIsFavorite] = useState(false);
	const [recipeDetails, setRecipeDetails] = useState({})
	const [recipeInformation, setRecipeInformation] = useState([])
	const [recipeInstructions, setRecipeInstructions] = useState([])

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

		const getRecipeInformation = async () => {
			const recipeInfo = await actions.getRecipeInformation(params.id)
			setRecipeInformation(recipeInfo)

			setRecipeDetails({
				id: params.id,
				image: recipeInfo.image,
				title: recipeInfo.title,
				servings: recipeInfo.servings,
				prepTime: recipeInfo.readyInMinutes,
				cost: recipeInfo.pricePerServing,
				diet: recipeInfo.diets,
			})
		};

		const getRecipeInstructions = async () => {
			const recipeInst = await actions.getRecipeInstructions(params.id)
			setRecipeInstructions(recipeInst)
		};

		getRecipeInformation()
		getRecipeInstructions()
		actions.getSimilarRecipes(params.id)
		window.scrollTo(0, 0)

		if (store.favouriteRecipes) {
			setIsFavorite(store.favouriteRecipes.some(recipe => recipe.recipeExternalId == params.id))
		}

	}, [params.id])


	return (
		<div className="container d-flex flex-column justify-content-center">
			<div className="row d-flex justify-content-between mt-5 pe-2">

				<div className="col-sm-12 col-md-5">
					<div className="container-fluid d-flex justify-content-between align-items-middle mb-4 mx-0 px-2">
						<h1 className="col-sm-9 col-md-9 col-lg-9 fs-3 text-start mb-0">{recipeInformation.title}</h1>
						<div className="col-sm-3 col-md-3 col-lg-3 d-flex justify-content-end align-items-center">
							<i onClick={toggleFavorite} className={`fa${isFavorite ? 's' : 'r'} fa-star fa-2x`} data-bs-toggle={!store.token || store.token === undefined ? "modal" : ""} data-bs-target={!store.token || store.token === undefined ? "#favouritesModal" : "#"}></i>
						</div>
					</div>

					<img src={recipeInformation.image} className="recipe-image pb-3" alt="Recipe Image" />

					<div className="d-flex flex-column justify-content-between text-center mt-3 mb-5">
						<div className="d-flex justify-content-around">
							<div className="col-sm-12 col-md-6">
								<FontAwesomeIcon icon="fa-solid fa-clock" size="2xl" className="pe-2 pt-3" />
								{recipeInformation.readyInMinutes} Minutes
							</div>

							<div className="col-sm-12 col-md-6">
								<FontAwesomeIcon icon="fa-solid fa-utensils" size="2xl" className="pe-2 pt-3" />
								{recipeInformation.servings} Servings
							</div>
						</div>

						<div className="col-12 mt-4">
							<FontAwesomeIcon icon="fa-solid fa-hand-holding-dollar" size="2xl" className="pe-2 pt-3" />
							{Math.round(recipeInformation.pricePerServing) / 100} Dollars per Serving
						</div>

						<div className="col-12 mt-4">
							<FontAwesomeIcon icon="fa-solid fa-plate-wheat" size="2xl" className="pe-3" />
							{
								recipeInformation.diets ?
									recipeInformation.diets.length !== 0 ?
										recipeInformation.diets.join(", ").replace(/\b\w/g, l => l.toUpperCase())
										:
										"Omnivore"
									:
									"Omnivore"
							}
						</div>

						<div className="col-12 mt-4">
							<FontAwesomeIcon icon="fa-solid fa-bowl-food" size="2xl" className="pe-3" />
							{
								recipeInformation.dishTypes ?
									recipeInformation.dishTypes.length !== 0 ?
										recipeInformation.dishTypes.join(", ").replace(/\b\w/g, l => l.toUpperCase())
										:
										"Not defined."
									:
									"Not defined."
							}
						</div>
					</div>
				</div>

				<div className="col-sm-12 col-md-7 d-flex flex-column ps-2">
					<ul className="nav nav-pills nav-fill mb-5 px-5" id="pills-tab" role="tablist">

						<li className="nav-item mx-5" role="presentation">
							<button className="nav-link active" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#pills-about" type="button" role="tab" aria-controls="pills-about" aria-selected="true">About</button>
						</li>

						<li className="nav-item mx-5" role="presentation">
							<button className="nav-link" id="pills-instructions-tab" data-bs-toggle="pill" data-bs-target="#pills-instructions" type="button" role="tab" aria-controls="pills-instructions" aria-selected="false">Instructions</button>
						</li>
					</ul>

					<div className="tab-content">
						<div className="tab-pane fade show active px-4" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab" tabIndex="0">
							{ReactHtmlParser(recipeInformation.summary)}
						</div>


						<div className="tab-pane fade d-flex justify-content-between px-0 mb-5" id="pills-instructions" role="tabpanel" aria-labelledby="pills-instructions-tab" tabIndex="0">
							<div className="col-sm-12 col-md-6 text-center">
								<div className="pb-3 fs-3 pt-3">Ingredients</div>
								{
									recipeInformation.extendedIngredients ?
										recipeInformation.extendedIngredients.map((ingredient, index) => {
											return <p key={index} className="mb-2"> {`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`} </p>
										})
										:
										""
								}
							</div>

							<div className="col-sm-12 col-md-6 d-flex flex-column justify-content-between text-center">
								<div className="pb-3 fs-3 pt-3">Instructions</div>
								{
									recipeInstructions ?
										recipeInstructions.map((part, index) => {
											return part.steps.map((step, idx) => {
												return <p key={idx} className="mb-2"> {`${step.number}. ${step.step}`} </p>
											})
										})

										:
										""
								}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<h1 className="pb-3 display-6 pt-3 text-center">Similar Recipes</h1>
				<div className="row container-fluid d-flex justify-content-around">
					{
						store.similarRecipesInfo ?
							store.similarRecipesInfo.map((recipe, index) => {
								return (
									<RecipeCard
										key={index}
										id={recipe.id}
										title={recipe.title}
										image={recipe.image}
										pricePerServing={recipe.pricePerServing}
										servings={recipe.servings}
										diets={recipe.diets}
										readyInMinutes={recipe.readyInMinutes}
									/>
								)
							})
							:
							console.log("NOTHING")
					}
				</div>
			</div>

			{/* MODAL TO BE DISPLAYED WHEN USER SELECTS FAVOURITE AND IS NOT LOGGED IN.*/}

			< div className="modal fade" id="favouritesModal" tabIndex="-1" aria-labelledby="favouritesModalLabel" aria-hidden={true} >
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
			</div >
		</div >
	);
};

Recipe.propTypes = {
	match: PropTypes.object
};