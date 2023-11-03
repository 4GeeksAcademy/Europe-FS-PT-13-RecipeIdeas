const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userDetails: {
				firstName: "Afonso",
    			lastName: "Bernardes",
				username: "afonso_bernardes",

				email: "afonso.duarte.bernardes@gmail.com",
				linkedIn: "https://www.linkedin.com/in/afonso-bernardes/",
				github: "https://github.com/AfonsoBernardes",
			},	
		},

		actions: {

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			setUserDetails: (userDetails) => {
				// PUT request to user's database.
				setStore({ userDetails: userDetails })
				console.log(userDetails.firstName)
			},

			setProfilePicture: async () => {
				await fetch(process.env.BACKEND_URL + "api/test")
			} 
		}
	};
};

export default getState;
