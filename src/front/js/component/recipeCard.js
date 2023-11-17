import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const RecipeCard = (props) => {

	const [isFavorite, setIsFavorite] = useState(false);
	const [euros, setEuros] = useState("");
	const [diets, setDiets] = useState("Omnivore");

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};



	useEffect(() => {
		totalRecipePrice();
		dietDisplay();
	  }, []);



	const totalRecipePrice = () => {
		let price = props.pricePerServing * props.servings;
		price = Math.round(price / 100);
		console.log(price);

		if (price <= 5) {
			setEuros("€")
		}
		else if (price <= 10) {
			setEuros("€€")

		}
		else if (price <= 15) {
			setEuros("€€€")
		}
		else {
			setEuros("€€€€")
		}
	}

	const dietDisplay = () => {
		if (props.diets.length === 0) {
			setDiets("Omnivore");
		} else {
			setDiets(props.diets.join(", "));
		}
	};




	return (
		<li className="col-sm-3 col-md-3 col-lg-3 me-4" style={{ listStyleType: "none" }}>
			<div className="mt-4 rounded-top" style={{backgroundColor: "#ffcab0"}}>
				<div className="row">
					<div className="col-sm-6 col-md-6 col-lg-9">
						<h5 className="m-2">{props.title}</h5>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-3 d-flex align-items-center">
						<i onClick={toggleFavorite} className={`fa${isFavorite ? 's' : 'r'} fa-heart fa-2x`}></i>
					</div>
				</div>
				<img src={props.image} className="card-img-top" alt="Recipe Image" />
				<div className="row">
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i className="fas fa-utensils fa-lg"></i> {props.servings} servings</p>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i className="far fa-clock fa-lg"></i> {props.readyInMinutes} minutes</p>
					</div>
					<div className="col-sm-3 col-md-3 col-lg-4">
						<p className="mt-1 ms-2"><i className="fas fa-coins fa-lg"></i> {euros}</p>
					</div>
					<div />
					<div className="d-flex justify-content-center">
						<p className="mt-1 ms-2"><i className="fas fa-apple-alt fa-lg"></i> {diets}</p>
					</div>
					<div className="d-flex justify-content-center">
						<Link to={"/recipe/" + props.id} className="d-flex justify-content-center">
							<button type="button" className="btn btn-primary w-100">Go to Recipe</button>
						</Link>
					</div>
				</div>
			</div >
		</li>
	);
};

export default RecipeCard;