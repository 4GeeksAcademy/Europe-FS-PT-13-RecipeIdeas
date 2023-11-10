import { number } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			randomRecipes: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},


			// totalRecipePrice, dietDisplay, setRecipe, this were the arguments inside the func below
			getRandomRecipe: () => {
				const store = getStore();
				fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3", {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-RapidAPI-Key': 'f4a6409e03msh2513ad740baf8b9p13e32fjsn5d20d8842c5f',
						'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
					},
					body: JSON.stringify()
				})
					.then(async (data) => {
						const response = await data.json();
						return response;
					})
					.then((data) => {
						setStore({ randomRecipes: data["recipes"] });
						console.log("store in the flux")
						console.log(getStore().randomRecipes)
						
					})
					.catch((error) => {
						console.error('There was a problem with the fetch operation:', error);
					});
			},

		}
	};
};

export default getState;
