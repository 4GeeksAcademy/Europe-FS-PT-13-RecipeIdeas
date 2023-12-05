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
			<div className="mt-5 mb-5 align-items-center d-flex justify-content-center bg-image-home">
				<div className="mt-4 p-5 text-white rounded container">
					<h1 className="text-start text-light display-3 fw-semibold text-center">Mixing Food</h1>
					<p className=" my-3 fs-5 text-start">Welcome to Mixing food! We're a humble provider of mouthwatering dishes that you can find with just a few clicks. Embark on a culinary journey that celebrates the art of mixing and blending ingredients. Click below to start searching for the perfect recipe. Happy Cooking!</p>
				</div>
			</div>
			<div className="d-flex justify-content-center mb-3">
				<Link to={"/resultpage"}>
					<button type="button" className="btn shadow-md text-dark px-5 py-3 rounded button-class"><p className="text-light display-6">Search for recipes</p></button>
				</Link>
			</div>
			<div className="container p-5 mt-3" style={{ backgroundColor: "#FCB97D" }}>
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
