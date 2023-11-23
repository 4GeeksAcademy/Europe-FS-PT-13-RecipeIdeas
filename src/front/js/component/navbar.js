import React, { useContext, useState, useEffect } from "react";
import "../../styles/navbar.css"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/Logo.png";
import food from "../../img/food.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const [selectValue, setSelectValue] = useState("");

	const navigate = useNavigate();

	const handleSelectChange = (event) => {
		setSelectValue(event.target.value);
	}

	const handleLogout = (event) => {
		actions.logout()
		navigate("/")
	}

	const defaultImage = () => {
		const source = store.userDetails.avatar || logo;
		return source;
	}

	useEffect(() => {
		actions.getUserDetails()
	}, []

	return (
		<nav className="navbar navbar-expand-sm d-flex container-fluid d-flex justify-content-between py-2 px-5">
			<div className="justify-content-between">
				<a className="navbar-brand" href="/">
					<img src={logo} style={{ width: "50px", height: "43px" }}></img>
					<img src={food} style={{ width: "200px", height: "43px" }} />
				</a>
			</div>

			{!store.token ?
				<>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav ms-md-auto gap-2 ">

							<li className="nav-item rounded pe-3">
								<a className="nav-link active" aria-current="page" href="/signup"><FontAwesomeIcon icon="fas fa-user-plus" size="xl" />Sign Up</a>
							</li>

							<li className="nav-item rounded">
								<a className="nav-link" href="/login"><FontAwesomeIcon icon="fas fa-sign-in-alt" size="xl" />Log In</a>
							</li>
						</ul>
					</div>
				</>
				:
				<>

					<div className="nav-item dropdown rounded">
						<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><FontAwesomeIcon icon="fas fa-user-alt" />Profile</a>
						<ul className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">

							<div className="profile-highlight details">

								<img className="dropdown-toggle avatarmenu img-fluid rounded-circle mx-auto" data-bs-toggle="dropdown" src={defaultImage()}></img>
								<a id="profile-name">{store.userDetails.name}</a>

							</div>

							<li>
								<a className="dropdown-item" href="/profile"><FontAwesomeIcon icon="fas fa-user-circle" />Account</a>
							</li>

							<li className="dropdown-divider"></li>

							<li>
								<button onClick={handleLogout} className="dropdown-item"><FontAwesomeIcon icon="fas fa-sign-out-alt" />Log out</button>
							</li>
						</ul>
					</div>
				</>
			}


		</nav>
	);
};
