import React from "react";
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Main.css";
import Bck from "../images/bck2.jpg";

export default function Main(){
    const profile = useSelector((state) => state.theStore.value);
    return(
        <>
        <div className="main">
            <div className="top">
                <h6>Welcome {profile.name}</h6>
                <p className="content">According to modern journaling tools, you can control your negative thoughts and emotions,
                    first by releasing all the negative emotions, then writing a substitute positive thought,
                    and let yourself imagine all the positive emotions released from this thought.
                    {'\n'}By following this practice every now and then, you can smoothly overcome your negative
                    thinking. 
                </p>
                <p>
                    <Link className="navigate" to="/new">Next</Link>
                </p>
            </div>
            <div className="bottom">
                <img src={Bck} align="center" style={{height:98+'%',width:98+'%'}}/>
            </div>
        </div>
        
        </>
    );
}