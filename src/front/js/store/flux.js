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
			complexSearchResults: [],
			complexSearchIds: [],
			filteredRecipes: [],

			userDetails: {
				firstName: "",
				lastName: "",
				username: null,

				email: null,
				linkedIn: null,
				github: null,

				avatar: null,
			},

		},

		actions: {

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}
				catch (error) {
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
						console.log(store.randomRecipes)

					})
					.catch((error) => {
						console.error('There was a problem with the fetch operation:', error);
					});
			},

			getComplexSearch: (cuisine, diet, type, minCalories, maxCalories) => {
				const store = getStore();
				const actions =getActions();
				console.log(cuisine)
				fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?number=10&${cuisine}&${diet}&${type}&${minCalories}&${maxCalories}`, {
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
						setStore({ complexSearchResults: data["results"] });
						console.log("store for the complex search results");
						console.log(store.complexSearchResults)

					})
					.then(() => {
						store.complexSearchIds = store.complexSearchResults.map(item => item.id)
						console.log("complex search ids")
						console.log(store.complexSearchIds)
					})
					.then(()=>{
						actions.getFilteredRecipes()
					}

					)
					//doing a informtaion bulk request get to get the information needed to appear on the cards
					.catch((error) => {
						console.error('There was a problem with the fetch operation:', error);
					});
			},

			getFilteredRecipes: () => {
				const store = getStore();
				console.log("checking for ids in the store", store.complexSearchIds)
				fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk?ids=${store.complexSearchIds}`, {
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
						setStore({filteredRecipes: data});
						console.log("logging the recipe search data", data)
						console.log("filtered recipes")
						console.log(store.filteredRecipes)

					})
					.catch((error) => {
						console.error('There was a problem with the fetch operation:', error);
					});
			},


			getuserDetails: async () => {
				// Get logged user id and call API to get further info.
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/get_user`)
					const data = await resp.json()
					const userData = await data.user
					setStore({
						userDetails: {
							...getStore()['userDetails'], "email": userData['email'], "avatar": userData['avatar'], "username": userData['username'],
							"firstName": userData['firstName'], "lastName": userData['lastName'],
							"linkedIn": userData['linkedIn'], "github": userData['github']
						}
					})
				}
				catch (error) {
					console.log("Error fetching user data ('getUserDetails()' in flux.js). User might not exist.")
					console.log(error)
				}
			},

			setUserDetails: async (userDetails) => {
				// PUT request to user's database.
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/update_user`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},

							body: JSON.stringify(userDetails)
						}
					);

					const resp_json = await resp.json()
					setStore({ userDetails: userDetails })
				}
				catch (error) {
					console.log("Error updating user's information.", error)
				}
			},

			setProfilePicture: async (url) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/upload_avatar`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},

							body: JSON.stringify({ image_url: url })
						}
					)
					const resp_json = await resp.json()
					const newAvatar = await resp_json['avatar']
					setStore({ userDetails: { ...getStore()['userDetails'], "avatar": newAvatar } })
				}
				catch (error) {
					console.log("Error setting user's profile picture.", error)
				}
			},
		}
	};
};

export default getState;
