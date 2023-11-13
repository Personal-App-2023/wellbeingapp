import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF,faInstagram,faXTwitter,faLinkedin } from '@fortawesome/free-brands-svg-icons' ;
import {NavLink} from "react-router-dom";
import "../styles/Footer.css";
import ReactGA from 'react-ga';

export default function Footer(){
    return(
        <>
        <div>
  <footer
          className="text-center text-sm-start text-dark"
          >
    <section
             className="d-flex justify-content-between p-2 text-white"
             style={{backgroundColor: "#198754"}}>
      <div className="me-5">
        Get connected with us on social networks:
      </div>
      <div>
        <a href="https://www.facebook.com/profile.php?id=61553077436219" className="text-white me-4" 
          target="_blank"
          onClick={
                  ReactGA.event(
                    {category:"Footer", action:"FB", label:"FB"}
                    )}>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="https://twitter.com/AppPeaceful" className="text-white me-4" 
          target="_blank"
          onClick={
          ReactGA.event(
            {category:"Footer", action:"Twitter", label:"Twitter"}
            )
        }>
         <FontAwesomeIcon icon={faXTwitter} />
        </a>
      </div>
    </section>
    <section className="">
      <div className="container text-center text-md-start mt-5">
        <div className="row mt-3">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
            <h6>Wellbeing App</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: 60+'px', backgroundColor: '#7c4dff', height: 2+'px'}}
                />
            <p>
              Here you can add your daily thoughts, overcome negative thinking, and view insights 
              about your monthly overall thoughts and emotions.
            </p>
          </div>
          
          <div className="links col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
            <h6>Useful links</h6>
            <hr
                className="small mb-4 mt-0 d-inline-block mx-auto"
                style={{width: 60+'px', backgroundColor: '#7c4dff', height: 2+'px'}}
                />
            <hr
                className="large mb-4 mt-0"
                style={{width: 60+'px', backgroundColor: '#7c4dff', height: 2+'px'}}
                />
            <p>
              <NavLink className="navi" to="/">Main</NavLink>
            </p>
            <p>
              <NavLink className="navi" to="/new">New_Thought</NavLink>
            </p>
            <p>
              <NavLink className="navi" to="/report">Report</NavLink>
            </p>
            <p>
              <NavLink className="navi" to="/feedback">Feedback</NavLink>
            </p>
          </div>
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
            <h6>Contact</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                style={{width: 60+'px', backgroundColor: '#7c4dff', height: 2+'px'}}
                />
            <p><i className="fas fa-envelope mr-3"></i> peacefulapp.info@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
    <div
         className="text-center p-3"
         style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
         >
      © 2020 Copyright:
      <a className="text-dark" href="https://mdbootstrap.com/"
         >MDBootstrap.com</a
        >
    </div>
  </footer>
</div>
        </>
    );
}