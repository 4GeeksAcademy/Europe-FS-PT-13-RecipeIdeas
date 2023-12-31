//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAt, faEnvelope, faPerson, faPeopleGroup, faCamera, faClock, faUtensils, faPlateWheat, faBowlFood, faHandHoldingDollar, faKey, faUserPlus, faSignInAlt, faUserAlt, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(faAt, faEnvelope, faPerson, faPeopleGroup, faCamera, faClock, faUtensils, faPlateWheat, faBowlFood, faHandHoldingDollar, fab, faKey, faUserPlus, faSignInAlt, faUserAlt, faUserCircle, faSignOutAlt)


//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
