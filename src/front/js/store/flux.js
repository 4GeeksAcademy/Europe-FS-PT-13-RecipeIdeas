import { number } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			user: null,
			message: null,

			randomRecipes: [],
			similarRecipesInfo: [],

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
				const store = getStore()
				if (!store.token) {
					const token = sessionStorage.getItem("token");
					if (token) {
						setStore({ ...store, token: token });
					}
				}
				if (!store.user) {
					const user = JSON.parse(sessionStorage.getItem("user"));
					if (user) {
						setStore({ ...store, user: user });
					}
				}
			},

			logout: () => {
				const store = getStore()
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("user");
				console.log("Log out");
				setStore({ ...store, token: null, user: null });

			},

			login: async (email, password) => {
				const store = getStore()
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
						sessionStorage.setItem("user", JSON.stringify(data.user));
						setStore({ ...store, token: data.access_token, user: data.user })
						return true
					})
					.catch(error => {
						console.log("There was an error", error)
						return false
					})
			},

			signup: (name, email, password) => {
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(
						{
							"name": name,
							"email": email,
							"password": password
						})
				}

				return fetch(process.env.BACKEND_URL + "api/signup", opts)
					.then(resp => {
						if (resp.status === 200) return resp.json();
						else return false;
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
						setStore({ ...store, randomRecipes: data["recipes"] });
					})
					.catch((error) => {
						console.error('There was a problem with the fetch operation:', error);
					});
			},


			getuserDetails: async () => {
				// Get logged user id and call API to get further info.
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/get_user/${getStore().user.email}`)
					const data = await resp.json()
					const userData = await data.user
					const store = getStore()
					setStore({
						...store,
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
					const store = getStore()
					const resp = await fetch(`${process.env.BACKEND_URL}api/update_user`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},

							body: JSON.stringify(userDetails)
						}
					);
					console.log(userDetails)
					console.log(store.user)
					const resp_json = await resp.json()
					setStore({ ...store, user: userDetails })
					sessionStorage.setItem("user", JSON.stringify(userDetails));
					sessionStorage.removeItem("user");
				}
				catch (error) {
					console.log("Error updating user's information.", error)
				}
			},

			setProfilePicture: async (url, email) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/upload_avatar`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},

							body: JSON.stringify({ image_url: url, email: email })
						}
					)
					const resp_json = await resp.json()
					const newAvatar = await resp_json['avatar']
					const store = getStore()
					setStore({
						...store,
						userDetails: { ...getStore()['userDetails'], "avatar": newAvatar }
					})
					sessionStorage.removeItem("user");
					sessionStorage.setItem("user", JSON.stringify(data.user));
				}
				catch (error) {
					console.log("Error setting user's profile picture.", error)
				}
			},
		

			getRecipeSummary: async (recipe_id) => {
				// Get recipe's Title and "About"
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe_id}/summary`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data = await resp.json();
					return data
				}
				catch (error) {
					console.error('There was a problem with "getRecipeSummary": ', error);
				};
			},

			getRecipeInformation: async (recipe_id) => {
				// Get recipe's Title and "About"
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe_id}/information`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data = await resp.json();
					return data
				}
				catch (error) {
					console.error('There was a problem with "getRecipeInstructions": ', error);
				};
			},

			getRecipeInstructions: async (recipe_id) => {
				// Get recipe's step-by-step instructions.
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe_id}/analyzedInstructions`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data = await resp.json();
					return data
				}
				catch (error) {
					console.error('There was a problem with "getRecipeInstructions": ', error);
				};
			},

			getSimilarRecipes: async (recipe_id) => {
				// Get recipe's step-by-step instructions.
				try {
					const resp = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe_id}/similar`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-RapidAPI-Key': process.env.X_RAPIDAPI_KEY,
							'X-RapidAPI-Host': process.env.X_RAPIDAPI_HOST
						},
					})

					const data = await resp.json();
					const shuffledRecipes = data.sort(() => Math.random() - 0.5).slice(0, 3) // Randomize array.

					const recipesInfo = await Promise.all(shuffledRecipes.map(async (recipe, index) => {
						const dishInfo = await getActions().getRecipeInformation(recipe.id)
						return dishInfo
					}))
					const store = getStore()
					setStore({
						...store,
						similarRecipesInfo: recipesInfo
					})
					return recipesInfo
				}
				catch (error) {
					console.error('There was a problem with "getSimilarRecipe": ', error);
				};
			},
		}
	};
};

export default getState;
