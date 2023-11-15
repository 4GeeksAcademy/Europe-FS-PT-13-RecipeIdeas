import React, { useContext, useState } from "react";
import "../../styles/navbar.css"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/Logo.png";
import food from "../../img/food.png";



export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const [selectValue, setSelectValue] = useState("");

	const handleSelectChange = (event) => {
		setSelectValue(event.target.value);
	}

	return (
		<nav className="navbar container d-flex py-2">
			<div className="text-wrapper">
				<Link to="/">
					<img src={logo} style={{ width: "50px", height: "43px" }}></img><img src={food} style={{ width: "200px", height: "43px" }} />
				</Link>
			</div>





			{!store.token ?
				<>
					<div className="sign-up-button col-auto">
						<Link className='link' to="/signup">Sign Up</Link>
					</div>


					<div className="log-in-button col-auto">

						<Link className='link' to="/login">Log In</Link>

					</div>
				</>
				:
				<>
					<div class="dropdown">

						<img class="dropdown-toggle" data-bs-toggle="dropdown" src={logo} style={{ width: "50px", height: "43px" }}></img>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="#">{store.user && store.user.name}</a></li>
							<li><button onClick={() => actions.logout()} className="dropdown-item">Log out</button></li>

						</ul>
					</div>

				</>
			}

		</nav>
	);
};
