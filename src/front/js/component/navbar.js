import React from "react";
import "../../styles/navbar.css"
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
	  <nav className="navbar">
		<div className="text-wrapper">Main Course</div>
		<div className="log-in-button">
		<Link className= 'nav-link' to="/login">Log In</Link>
		</div>
		<div className="sign-up-button">
		<Link className= 'nav-link' to="/signup">Sign Up</Link>
		</div>
		
	  </nav>
	);
  };
