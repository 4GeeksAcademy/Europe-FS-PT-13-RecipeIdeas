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
		}

		//fetchRecipeSummary()
		fetchRecipeInformation()

	}, [])

	return (
		<div className="container-fluid d-flex flex-column justify-content-center px-5">
			<h1 className="display-4 text-center py-5">{recipeInformation.title}</h1>
			<img src={recipeInformation.image} className="recipe-image img-fluid pb-5" alt="Recipe Image" />

			<div className="container-fluid d-flex flex-column justify-content-center">
				<div className="row d-flex justify-content-between text-center mb-4">
					<div className="col-sm-6 col-md-3">
						<FontAwesomeIcon icon="fa-solid fa-clock" size="2xl" className="pe-3" />
						{recipeInformation.readyInMinutes} Minutes
					</div>

					<div className="col-sm-6 col-md-3">
						<FontAwesomeIcon icon="fa-solid fa-utensils" size="2xl" className="pe-3" />
						{recipeInformation.servings} Servings
					</div>

					<div className="col-sm-6 col-md-3">
						<FontAwesomeIcon icon="fa-solid fa-dollar-sign" size="2xl" className="pe-3" />
						{Math.round(recipeInformation.pricePerServing) / 100} Dollars per Serving
					</div>
				</div>

				<div className="row d-flex justify-content-between text-center m-3">
					<div className="col-sm-12 col-md-6">
						<FontAwesomeIcon icon="fa-solid fa-plate-wheat" size="2xl" className="pe-3" />
						{
							recipeInformation.diets ?
								recipeInformation.diets.join(", ")
								:
								"Omnivore"
						}
					</div>

					<div className="col-sm-12 col-md-6">
						<FontAwesomeIcon icon="fa-solid fa-bowl-food" size="2xl" className="pe-3" />
						{
							recipeInformation.dishTypes ?
								recipeInformation.dishTypes.join(", ")
								:
								"Not defined."
						}
					</div>
				</div>

				<div className="row">
					<ul className="nav nav-pills nav-fill">
						<li className="nav-item">
							<a className="nav-link active" data-toggle="pill" aria-current="page" href="about">About</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="instructions">Instructions</a>
						</li>
					</ul>
				</div>



				
			</div>
		</div>
	);
};

Recipe.propTypes = {
	match: PropTypes.object
};