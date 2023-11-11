import React, { useState, useEffect, useContext } from "react";
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/recipePage.css"

export const Recipe = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	/*
	const [recipeTitle, setRecipeTitle] = useState("")
	const [recipeSummary, setRecipeSummary] = useState("")
	*/

	const [recipeInformation, setRecipeInformation] = useState("")

	useEffect(() => {
		/*const fetchRecipeSummary = async () => {
			const recipeSummary = await actions.getRecipeSummary(params.id)
			setRecipeTitle( await recipeSummary.title )
			setRecipeSummary( await recipeSummary.summary )
		}*/

		const fetchRecipeInformation = async () => {
			const recipeInformation = await actions.getRecipeInformation(params.id)
			setRecipeInformation(await recipeInformation)
			console.log(recipeInformation)
		}

		//fetchRecipeSummary()
		fetchRecipeInformation()

	}, [])

	return (
		<div className="container-fluid d-flex flex-column justify-content-center px-5">
			<h1 className="display-4 text-center pt-5 pb-3">{recipeInformation.title}</h1>

			<img src={recipeInformation.image} className="recipe-image img-fluid pb-3" alt="Recipe Image" />


			<div className="container-fluid d-flex flex-column justify-content-center">
				<div className="row d-flex justify-content-between text-center mb-4">
					<div className="col-sm-3 col-md-3">
						<FontAwesomeIcon icon="fa-solid fa-clock" size="2xl" className="pe-3 pt-3" />
						{recipeInformation.readyInMinutes} Minutes
					</div>

					<div className="col-sm-3 col-md-3">
						<FontAwesomeIcon icon="fa-solid fa-utensils" size="2xl" className="pe-3 pt-3" />
						{recipeInformation.servings} Servings
					</div>

					<div className="col-sm-3 col-md-3">
						<FontAwesomeIcon icon="fa-solid fa-dollar-sign" size="2xl" className="pe-3 pt-3" />
						{Math.round(recipeInformation.pricePerServing) / 100} Dollars per Serving
					</div>
				</div>

				<div className="row d-flex justify-content-between text-center mx-3">
					<div className="col-sm-12 col-md-6">
						<FontAwesomeIcon icon="fa-solid fa-plate-wheat" size="2xl" className="pe-3 mt-3" />
						{
							recipeInformation.diets ?
								recipeInformation.diets.join(", ")
								:
								"Omnivore"
						}
					</div>

					<div className="col-sm-12 col-md-6">
						<FontAwesomeIcon icon="fa-solid fa-bowl-food" size="2xl" className="pe-3 mt-3" />
						{
							recipeInformation.dishTypes ?
								recipeInformation.dishTypes.join(", ")
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
						</div>

						<div className="row tab-pane fade d-flex justify-content-between px-0" id="pills-instructions" role="tabpanel" aria-labelledby="pills-instructions-tab" tabIndex="0">
							
							<div className="col-sm-12 col-md-6 d-flex flex-column text-center">
								<div className="pb-3 fs-3">Ingredients</div>
								{
									recipeInformation.extendedIngredients ?
										recipeInformation.extendedIngredients.map((ingredient, index) => {
											return <p key={index} className="mb-2"> {`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`} </p>
										})
									:
									""
								}
							</div>

							<div className="col-sm-12 col-md-6 text-center">
								<div className="pb-3 fs-3">Instructions</div>
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