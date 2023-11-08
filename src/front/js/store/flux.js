const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,

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
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}
				catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getuserDetails: async () => {
				// Get logged user id and call API to get further info.
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/get_user`)
					const data = await resp.json()
					const userData = await data.user
					setStore( { userDetails: {...getStore()['userDetails'], "email": userData['email'], "avatar": userData['avatar'], "username": userData['username'],
																			"firstName": userData['firstName'], "lastName": userData['lastName'],
																			"linkedIn": userData['linkedIn'], "github": userData['github']} })
				}
				catch(error) {
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
				catch(error) {
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
					setStore( { userDetails: {...getStore()['userDetails'], "avatar": newAvatar} } )
				}
				catch(error) {
					console.log("Error setting user's profile picture.", error)
				}
			},
		}
	};
};

export default getState;
