import React,{ useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import Logo from "../images/logo3.jpg";//logo3.jpg
import { getProfile } from "../components/store";
import "../styles/Header.css";
/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';*/
import { GoogleLogin,googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useSelector, useDispatch } from "react-redux";
import $ from 'jquery';

export default function Header(){
  const [isNavOpen, setNavOpen] = useState(false);
  
  const toggleNavbar = () => {
    setNavOpen(!isNavOpen);
  };

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.theStore.value);
  /*const logOut = () => {
    googleLogout();
    //setProfile({});
    dispatch(getProfile({}));
    console.log('global profile logout',profile);
};*/

    return(
        
        <header className="container-inner">
            <img src={Logo} className="logo"/>
            <nav className="mynav navbar navbar-expand-sm navbar-dark">
            <div className="container-fluid">
            {/*<NavLink className="navbar-brand" to="/">Main</NavLink>*/}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav">
              <li className="nav-item">
                  <NavLink className="nav-link active" to="/">Main</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/new">New Thought</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/report">Reports</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/feedback">Feedback</NavLink>
                </li>
              </ul>
            </div>
            <div className="ml-auto">
              <button className="btn btn-sm btn-success" onClick={() => {
                        googleLogout();
                        //setProfile({});
                        dispatch(getProfile({}));
                        console.log('global profile logout',profile);
                    }}>Logout</button>
            </div>
            </div>
          </nav>

        </header>
    );
}