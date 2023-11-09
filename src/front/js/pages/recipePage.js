import React, { useState, useEffect, useContext } from "react";
import ReactHtmlParser from 'react-html-parser'; 

import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Recipe = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	const [recipeTitle, setRecipeTitle] = useState("")
	const [recipeSummary, setRecipeSummary] = useState("")

	useEffect(() => {
		const fetchRecipe = async () => {
			const recipeDetails = await actions.getRecipeSummary(params.id)
			setRecipeTitle( await recipeDetails.title )
			setRecipeSummary( await recipeDetails.summary )
		}
		fetchRecipe()
	}, [])

	return (
		<div className="jumbotron">
			<h1 className="display-4">{recipeTitle}</h1>

			<div> { ReactHtmlParser (recipeSummary) } </div>

		</div>
	);
};

Recipe.propTypes = {
	match: PropTypes.object
};