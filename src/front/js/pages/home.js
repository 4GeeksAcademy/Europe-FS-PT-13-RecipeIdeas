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


	return (
		<>
			<div className="mt-5 mb-5 align-items-center d-flex justify-content-center bg-image shadow">
				<h1 className="text-center text-light display-4">Mixing Food</h1>
			</div>
			<div className="container col-6 mt-5 mb-5 align-items-center d-flex justify-content-center rounded-pill p-4 shadow" style={{ backgroundColor: "#ffcab0" }}>
				<p>Welcome to Mixing food! Your culinary haven for diverse and delicious recipes! We're a humble provider of mouthwatering dishes that you can find with just a few clicks. Whether you're a seasoned chef or a kitchen novice, our extensive collection of recipes spans various cuisines, dietary preferences, and skill levels. Explore a world of flavors, discover new cooking techniques, and embark on a culinary journey that celebrates the art of mixing and blending ingredients. Click below to start searching for the perfect recipe. Happy Cooking!</p>
			</div>

			<div className="d-flex justify-content-center">
				<Link to={"/resultpage"}>
					<button type="button" className="btn display-6 shadow-lg text-dark ps-5 pe-5 pt-3 pb-3 rounded-pill" style={{ backgroundColor: "#e0ffcd" }}>Search for recipes</button>
				</Link>
			</div>
			<div className="container p-5 rounded" style={{ backgroundColor: "#ffebbb" }}>
				<h1 className="text-center display-6">Suggested Recipes</h1>
				<div className="row">
					<ul className="d-flex justify-content-around">
						{store.randomRecipes.map((p, index) => {
							return (
								<RecipeCard
									key={index}
									id={p.id}
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
