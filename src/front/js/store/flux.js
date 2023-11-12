import { number } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
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
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},


			getToken: () => {
				if (!getStore().token) {
					const token = sessionStorage.getItem("token");
					if (token) {
						setStore({ token: token });
					}
					return token
				}


			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Log out");
				setStore({ token: null });

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
			getMessage: () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer" + store.token
					}
				};
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "api/hello", opts)
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					// don't forget to return something, that is how the async resolves
					.catch(error => console.log("Error loading message from backend", error));

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
