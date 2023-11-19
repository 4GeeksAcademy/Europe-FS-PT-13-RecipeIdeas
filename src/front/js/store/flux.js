import { store } from "fontawesome";
import { number } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null,
			message: null,
      
			randomRecipes: [],
			similarRecipesInfo: [],
			favouriteRecipes: [],

			userDetails: {
				name: "",
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

			refreshStore: () => {
				if (!getStore().token) {
					const token = sessionStorage.getItem("token");
					const user = sessionStorage.getItem("user");

					if (token) {
						setStore({ token: token });
						setStore({ user: user });
					}
				}
			},


			logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("user");
				setStore(
					{
						token: null,
						userDetails: {
							name: "",
							firstName: "",
							lastName: "",
							username: null,
			
							email: null,
							linkedIn: null,
							github: null,
			
							avatar: null,
						},
					}
				);
			},


			login: async (email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						})
				}

				return fetch(process.env.BACKEND_URL + "api/token", opts)

					.then(resp => {
						if (resp.status === 200) return resp.json();
						else return false
					})
					.then(data => {
						console.log("this came from the backend", data)
						sessionStorage.setItem("token", data.access_token);
						setStore({ token: data.access_token })
						sessionStorage.setItem("user", data.user);
						setStore({ user: data.user })
						return true
					})
					.catch(error => {
						console.log("There was an error during login: ", error)
						return false
					})
			},


			signup: async (name, email, password) => {
				const opts = {
					method: "POST",
					headers:{ 
            			"Content-Type": "application/json"
				  	},

					body: JSON.stringify(
						{
						"name" : name,
						"email": email,
						"password": password
						}
					)
				}
			  
				return fetch(process.env.BACKEND_URL + "api/signup", opts)
				.then(resp => {
					if(resp.status === 200) return resp.json();
				  	else { return false; }
				})
				.then(data => {
					console.log("sign up successful", data)
					return true;
				})
				.catch(error => {
					console.log("There was an error", error)
					return false;
				})
			},


			// totalRecipePrice, dietDisplay, setRecipe, this were the arguments inside the func below
			getRandomRecipe: () => {
				const store = getStore();
				fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=3", {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
						'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
					},
					body: JSON.stringify()
				})
					.then(async (data) => {
						const response = await data.json();
						return response;
					})
					.then((data) => {
						setStore({ randomRecipes: data["recipes"] });
					})
					.catch((error) => {
						console.error('There was a problem with the fetch operation:', error);
					});
			},


			getuserDetails: async () => {
				// Get logged user id and call API to get further info.
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/get_user`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"Authorization": "Bearer " + getStore().token
							}
						}
					)
					const data = await resp.json()
					const userData = await data.user
					setStore({
						userDetails: {
							...getStore()['userDetails'], "email": userData['email'], "avatar": userData['avatar'], "username": userData['username'],
							"name": userData['name'], "firstName": userData['firstName'], "lastName": userData['lastName'],
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
								"Authorization": "Bearer " + getStore().token
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
								"Authorization": "Bearer " + getStore().token
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


			getRecipeSummary: async (recipeId) => {
				// Get recipe's Title and "About"
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/summary`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data =  await resp.json();
					return data
				}
				catch(error) {
					console.error('There was a problem with "getRecipeSummary": ', error);
				};
			},


			getRecipeInformation: async (recipeId) => {
				// Get recipe's Title and "About"
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/information`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data =  await resp.json();
					return data
				}
				catch(error) {
					console.error('There was a problem with "getRecipeInstructions": ', error);
				};
			},


			getRecipeInstructions: async (recipeId) => {
				// Get recipe's step-by-step instructions.
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/analyzedInstructions`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data =  await resp.json();
					return data
				}
				catch(error) {
					console.error('There was a problem with "getRecipeInstructions": ', error);
				};
			},


			getSimilarRecipes: async (recipeId) => {
				// Get recipe's step-by-step instructions.
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeId}/similar`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data =  await resp.json();
					const shuffledRecipes = data.sort( () => Math.random()-0.5 ).slice(0,3) // Randomize array.

					const recipesInfo = await Promise.all(shuffledRecipes.map( async (recipe, index) => {
						const dishInfo = await getActions().getRecipeInformation(recipe.id)
						return dishInfo
					}))
					
					setStore( { similarRecipesInfo: recipesInfo } )
					return recipesInfo
				}
				catch(error) {
					console.error('There was a problem with "getSimilarRecipe": ', error);
				};
			},

			getFavourites: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/get_favourites`, {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + getStore().token
						},
					})

					const data = await resp.json()
					setStore({ favouriteRecipes: await data.favourite_recipes })
					return getStore().favouriteRecipes
				}
				catch(error) {
					console.error("There was a problem with getting the user's favourite recipe: ", error);
				}
			},

			addFavourite: async (recipeDetails) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/add_favourite`, {
						method: 'POST',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + getStore().token
						},

						body: JSON.stringify(
							{
								recipeId: recipeDetails.id,
								recipeTitle: recipeDetails.title,
								recipeServings: recipeDetails.servings,
								recipePrepTime: recipeDetails.prepTime,
								recipeCost: recipeDetails.cost,
								recipeDiet: recipeDetails.diet,
							}
						)
					})

					if (resp.ok) {
						const data = await resp.json()
						return data.message
					}

					return resp.status
				}
				catch(error) {
					console.error('There was a problem with adding a favourite recipe: ', error);
				}
			},

			removeFavourite: async (recipeDetails) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/delete_favourite`, {
						method: 'DELETE',
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + getStore().token
						},

						body: JSON.stringify(
							{
								recipeId: recipeDetails.id
							}
						)
					})

					if (resp.ok) {
						const data = await resp.json()
						return data.message
					}

					return resp.status
				}
				catch(error) {
					console.error('There was a problem with removing a favourite recipe: ', error);
				}
			},
		}
	};
};

export default getState;
