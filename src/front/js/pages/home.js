import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { RecipeCard } from "../component/recipeCard";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="text-center mt-5">
				<h1>Hello Rigo!!</h1>
				<p>
					<img src={rigoImageUrl} />
				</p>
				<div className="alert alert-info">
					{store.message || "Loading message from the backend (make sure your python backend is running)..."}
				</div>
				<p>
					This boilerplate comes with lots of documentation:{" "}
					<a href="https://start.4geeksacademy.com/starters/react-flask">
						Read documentation
					</a>
				</p>
			</div>
			<div className="container">
				<div className="d-flex justify-contents-center">
					<h1 className="">Random Recipes:</h1>
				</div>
				<div className="row">
					<ul className="container" style={{listStyleType: "none"}}>
						<RecipeCard Url="https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random" index="0" />
					</ul>
				</div>
			</div>
		</>
	);	
};
