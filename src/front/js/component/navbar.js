import React, { useContext, useState } from "react";
import "../../styles/navbar.css"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/Logo.png";
import food from "../../img/food.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { user } from "fontawesome";



export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const [selectValue, setSelectValue] = useState("");

	const handleSelectChange = (event) => {
		setSelectValue(event.target.value);
	}

	return (
		<nav className="navbar navbar-expand-lg d-flex container-fluid d-flex justify-content-between py-2">
			<div className="justify-content-between">
				<a className="navbar-brand" href="#">
					<Link to="/">
						<img src={logo} style={{ width: "50px", height: "43px" }}></img><img src={food} style={{ width: "200px", height: "43px" }} />
					</Link></a>
			</div>
				{ !store.token ?
	<>
	<div className="collapse navbar-collapse" id="navbarNav">
		<ul className="navbar-nav ms-md-auto gap-2 ">
			<li className="nav-item rounded">
				<a className="nav-link active" aria-current="page" href="#"><FontAwesomeIcon icon="fas fa-user-plus" size="1xl" /><Link className='link' to="/signup">Sign Up</Link></a>
			</li>
			<li className="nav-item rounded">
				<a className="nav-link" href="#"><FontAwesomeIcon icon="fas fa-sign-in-alt" size="1xl" /><Link className='link' to="/login">Log In</Link></a>
			</li>
		</ul>
	</div>
</>
:
<>
<div className="nav-item dropdown rounded">
<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><FontAwesomeIcon icon="fas fa-user-alt" />Profile</a>
<ul className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">   
<div class="profile-highlight details">
<img className="dropdown-toggle avatar img-fluid rounded-circle mx-auto" data-bs-toggle="dropdown" src={logo} style={{ width: "50px", height: "43px" }}>{store.user && store.user.avatar}</img>
<a id="profile-name">{store.user && store.user.name}</a>
      </div>
<li><a className="dropdown-item" href="#"><Link className='link' to="/profile"><FontAwesomeIcon icon="fas fa-user-circle" />Account</Link></a></li>
<li className="dropdown-divider">
</li>
<li><button onClick={() => actions.logout()} className="dropdown-item"><FontAwesomeIcon icon="fas fa-sign-out-alt" />Log out</button></li>
</ul>
</div>
</>
				}

		
		</nav>
	);
};
