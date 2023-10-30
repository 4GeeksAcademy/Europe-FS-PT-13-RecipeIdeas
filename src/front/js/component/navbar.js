import React from "react";
import "../../styles/navbar.css"
//import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
	  <nav className="navbar">
		<div className="text-wrapper">Main Course</div>
		<div className="log-in-button">
		  <div className="div">Log in</div>
		</div>
		<div className="sign-up-button">
		  <div className="text-wrapper-2">Sign Up</div>
		</div>
		
	  </nav>
	);
  };
