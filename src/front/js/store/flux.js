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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			

			getToken: () =>{
				return sessionStorage.getItem("token");
				
			},

			logout: () =>{
				sessionStorage.removeItem("token");
				console.log("Log out");
				setStore({token : null});

			},

			login: async (email, password) => {
				const opts ={
					method: "POST",
					headers:{ "Content-Type": "application/json"
				  },
					body:JSON.stringify(
					{
					  "email": email,
					  "password": password
					 })
				  }
			  
				const resp = await fetch(process.env.BACKEND_URL + "/api/token", opts)
				.then(resp =>{
				  if(resp.status === 200) return resp.json();
				  else alert("There has been some error");
				})
				.then(data => {
				  console.log("this came from the backend", data)
					sessionStorage.setItem("token", data.access_token);
				})
				.catch(error =>{
				  console.log("There was an error")
				})
			},

			signup: async (name, email, password) => {
				const opts ={
					method: "GET",
					headers:{ "Content-Type": "application/json"
				  },
					body:JSON.stringify(
					{
					  "name" : name,
					  "email": email,
					  "password": password
					 })
				  }
			  
				const resp = await fetch(process.env.BACKEND_URL + "/api/signup", opts)
				.then(resp =>{
				  if(resp.status === 200) return resp.json();
				  else alert("There has been some error");
				})
				.then(data => {
				  console.log("sign up successful", data)
					
				})
				.catch(error =>{
				  console.log("There was an error")
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
					fetch(process.env.BACKEND_URL + "/api/hello", opts)
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
			}
		}
	};
};

export default getState;
