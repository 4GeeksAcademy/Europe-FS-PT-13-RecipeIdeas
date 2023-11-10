import React, { useContext } from "react";
import "../../styles/navbar.css"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import mixingFood from "../../img/MixingFood.png";

// Comment
export const Navbar = () => {
	const { store, actions} = useContext(Context);
	return (
	  <nav className="navbar">
		<div className="text-wrapper"><img src={mixingFood} style={{width:"20px", height:"10px"}} /></div>
		
	
		<div className="sign-up-button">
		<Link className= 'nav-link' to="/signup">Sign Up</Link>
		</div>
		
		<div className="log-in-button">
			{!store.token?

		<Link className= 'nav-link' to="/login">Log In</Link>
		:
		<button onClick={() => actions.logout()} className="btn">Log out</button>
	}
		</div>

	  </nav>
	);
  };
