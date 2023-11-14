import React, { useContext } from "react";
import "../../styles/navbar.css"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/Logo.png";
import food from "../../img/food.png";


// Comment
export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const [selectValue, setSelectValue] = useState("");

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
				<div className="log-in-button">
				<button onClick={() => actions.logout()} className="btn">Log out</button> 
				</div>
			}

		</nav>
	);
};
