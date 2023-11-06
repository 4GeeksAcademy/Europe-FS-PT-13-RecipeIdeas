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

				avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flistimg.pinclipart.com%2Fpicdir%2Fs%2F351-3519728_png-file-svg-default-profile-picture-free-clipart.png&f=1&nofb=1&ipt=20c41a225bc465c20f51d2a0a087db917768fa1eca77d811c1f1832fdd60def0&ipo=images"
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

			setUserDetails: (userDetails) => {
				// PUT request to user's database.
				setStore({ userDetails: userDetails })
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
					const data = await resp.json()
					const newAvatar = await data['transformedImage']
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
