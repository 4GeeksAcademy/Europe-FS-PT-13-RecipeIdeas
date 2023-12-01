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
			<div className="container col-sm-12 col-md-10 col-lg-8 mt-5 mb-5 align-items-center d-flex justify-content-center rounded-pill p-4 shadow" style={{ backgroundColor: "#ffcab0" }}>
				<p className="mx-5 my-3">Welcome to Mixing food! Your culinary haven for diverse and delicious recipes! We're a humble provider of mouthwatering dishes that you can find with just a few clicks. Whether you're a seasoned chef or a kitchen novice, our extensive collection of recipes spans various cuisines, dietary preferences, and skill levels. Explore a world of flavors, discover new cooking techniques, and embark on a culinary journey that celebrates the art of mixing and blending ingredients. Click below to start searching for the perfect recipe. Happy Cooking!</p>
			</div>

			<div className="d-flex justify-content-center">
				<Link to={"/resultpage"}>
					<button type="button" className="btn display-6 shadow-md text-dark ps-5 pe-5 pt-3 pb-3 rounded-pill" style={{ backgroundColor: "#e0ffcd" }}>Search for recipes</button>
				</Link>
			</div>
			<div className="container p-5 mt-3" style={{ backgroundColor: "#ffebbb" }}>
				<h1 className="text-center display-6">Suggested Recipes</h1>
				<div className="row container-fluid d-flex justify-content-around mt-4 mx-2">
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
				</div>
			</div>
		</>
	);
};
