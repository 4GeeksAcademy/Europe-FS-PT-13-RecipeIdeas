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

	const [recipeInformation, setRecipeInformation] = useState([])
	const [recipeInstructions, setRecipeInstructions] = useState([])

	useEffect(() => {

		const getRecipeInformation = async () => {
			const recipeInfo = await actions.getRecipeInformation(params.id)
			setRecipeInformation(recipeInfo)
		};

		const getRecipeInstructions = async () => {
			const recipeInst = await actions.getRecipeInstructions(params.id)
			setRecipeInstructions(recipeInst)
		};

		getRecipeInformation()
		getRecipeInstructions()
		actions.getSimilarRecipes(params.id)
		window.scrollTo(0, 0)
	}, [params.id])


	return (
		<div className="container-fluid d-flex flex-column justify-content-center px-5">
			<div className="row d-flex justify-content-center mt-5">

				<img src={recipeInformation.image} className="col-lg-12 col-xl-6 recipe-image pb-3" alt="Recipe Image" />

				<div className="col-lg-12 col-xl-6 d-flex flex-column justify-content-between text-center mb-4 px-5">
					<h1 className="display-4 text-center pb-3">{recipeInformation.title}</h1>

					<div className="row d-flex justify-content-between">
						<div className="col-4">
							<FontAwesomeIcon icon="fa-solid fa-clock" size="2xl" className="pe-3 pt-3" />
							{recipeInformation.readyInMinutes} Minutes
						</div>

						<div className="col-4">
							<FontAwesomeIcon icon="fa-solid fa-utensils" size="2xl" className="pe-3 pt-3" />
							{recipeInformation.servings} Servings
						</div>

						<div className="col-4">
							<FontAwesomeIcon icon="fa-solid fa-dollar-sign" size="2xl" className="pe-3 pt-3" />
							{Math.round(recipeInformation.pricePerServing) / 100} Dollars per Serving
						</div>
					</div>

					<div className="col-12">
						<FontAwesomeIcon icon="fa-solid fa-plate-wheat" size="2xl" className="pe-3 mt-3" />
						{
							recipeInformation.diets ?
								recipeInformation.diets.length !== 0 ?
									recipeInformation.diets.join(", ")
									:
									"Omnivore"
								:
								"Omnivore"
						}
					</div>

					<div className="col-12">
						<FontAwesomeIcon icon="fa-solid fa-bowl-food" size="2xl" className="pe-3 mt-3" />
						{console.log("HEEERRREEE", recipeInformation.dishTypes)}
						{
							recipeInformation.dishTypes ?
								recipeInformation.dishTypes.length !== 0 ?
									recipeInformation.dishTypes.join(", ")
									:
									"Not defined."
								:
								"Not defined."
						}
					</div>
				</div>

				<div className="row mt-5">
					<ul className="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">

						<li className="nav-item mx-4" role="presentation">
							<button className="nav-link border border-primary border-2 active" id="pills-about-tab" data-bs-toggle="pill" data-bs-target="#pills-about" type="button" role="tab" aria-controls="pills-about" aria-selected="true">About</button>
						</li>

						<li className="nav-item mx-4" role="presentation">
							<button className="nav-link border border-primary border-2 " id="pills-instructions-tab" data-bs-toggle="pill" data-bs-target="#pills-instructions" type="button" role="tab" aria-controls="pills-instructions" aria-selected="false">Instructions</button>
						</li>

					</ul>

					<div className="tab-content mt-4" id="pills-tabContent">

						<div className="tab-pane fade show active" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab" tabIndex="0">
							{ReactHtmlParser(recipeInformation.summary)}
							<h1 className="pb-3 fs-3 pt-3 mt-5 text-center">Similar Recipes</h1>
							<div className="container d-flex justify-content-center">
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

						<div className="row tab-pane fade d-flex justify-content-between px-0" id="pills-instructions" role="tabpanel" aria-labelledby="pills-instructions-tab" tabIndex="0">

							<div className="col-sm-12 col-md-6 d-flex flex-column justify-content-between text-center">
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

							<div className="col-sm-12 col-md-6 flex-column justify-content-between text-center">
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
		</div>
	);
};

Recipe.propTypes = {
	match: PropTypes.object
};