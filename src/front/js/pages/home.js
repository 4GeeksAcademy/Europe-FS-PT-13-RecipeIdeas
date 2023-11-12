import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";
import { Link } from "react-router-dom"

export const Home = () => {
	const { store, actions } = useContext(Context);
	
	useEffect(() => {
		actions.getRandomRecipe()
	}, []);

	useEffect(() => {
		if (store.token && store.token != "" && store.token != undefined) actions.getMessage();
	}, [store.token]);

	return (
		<>
			<div>
				<Link to={"/resultpage"}>
					<button type="button" className="btn btn-primary">Search for recipes</button>
				</Link>
			</div>
			<div className="container p-5 rounded" style={{ backgroundColor: "#ffebbb" }}>
				<h1 className="text-center">Random Recipes:</h1>
				<div className="row">
					<ul className="d-flex justify-content-center" style={{ listStyleType: "none" }}>
						{store.randomRecipes.map((p, index) => {
							return (
								<RecipeCard
									key={index}
									title={p.title}
									image={p.image}
									pricePerServing={p.pricePerServing}
									servings={p.servings}
									diets={p.diets}
									readyInMinutes={p.readyInMinutes}
								/>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
};
