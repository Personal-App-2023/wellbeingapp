import React,{ useState } from "react";
import {NavLink} from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Feedback.css";
import ReactGA from 'react-ga';

export default function Feedback(){
    const profile = useSelector((state) => state.theStore.value);
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState("");
    const [reason, setReason] = useState("");
    const [liked, setLiked] = useState("");
    const [enhanced, setEnhanced] = useState("");
    return(
        <>
        <h6 className="feed-header">Enter your feedback</h6>
          <div className="feed-div">
          <form className="feed-form mb-3">
            <div className="mb-3">
              <div className="rating input-group">
                <label htmlFor="type" className="type form-label">Overall rating</label>
                <select id="type" className="light form-select" aria-label="Default select example"
                  onChange={(e) => {setRating(e.target.value);}} value={rating}>
                  <option value="notselected">Please select</option>
                  <option value="Outstanding">Outstanding</option>
                  <option value="Good">Good</option>
                  <option value="Acceptable">Acceptable</option>
                  <option value="Bad">Bad experience</option>
                  <option value="vBad">Very bad experience</option>
                </select>
              </div>
              <div className="mb-3">
                <textarea className="feed-text light form-control" id="r" value={reason} placeholder="Reason for your overall rating"
                    onChange={(e) => setReason(e.target.value)}/>
                <textarea className="feed-text light form-control" id="l" value={liked} placeholder="What you liked the most about this application?"
                    onChange={(e) => setLiked(e.target.value)}/>
                <textarea className="feed-text light form-control" id="e" value={enhanced} placeholder="What needs to be enhanced?"
                    onChange={(e) => setEnhanced(e.target.value)}/>
            </div>
                <button type="submit" className="feed-submit btn btn-primary"
                    onClick={async(e)=>{
                        e.preventDefault();
                        try {
                            let res = await fetch(`https://docs.google.com/forms/d/e/1FAIpQLScd8HXUq6fak0_tP9WGfGgs_KzfNQtmv2BkJkgj7vYhd-dDzA/formResponse?`+
                                    `&submit=Submit?usp=pp_url&entry.152209975=${profile.email}&entry.1371280183=Web`+
                                    `&entry.1520283093=${rating}&entry.1637772425=${reason}&entry.188264279=${liked}`+
                                    `&entry.1346374851=${enhanced}`, {
                              method: 'GET',
                              mode: 'no-cors'
                             /* headers: {
                                'Content-Type': 'application/json',
                              }*/
                            }).then(function() {
                                setMessage("Feedback sent successfully");
                                ReactGA.event(
                                  {category:"Feedback", action:"SendFBSuccess", label:rating}
                                  );
                              })
                              .catch(function() {
                                setMessage("Some error occured");
                                ReactGA.event(
                                  {category:"Feedback", action:"SendFBError", label:rating}
                                  );
                              });
                          } catch (err) {
                            console.log(err);
                            setMessage("Some error occured");
                            ReactGA.event(
                              {category:"Feedback", action:"SendFBError", label:rating}
                              );
                          }
                    }}>Submit</button>
                    <p className="feedback-msg">{message}</p>
            </div>
            
            </form>
         </div>
         </>
    );
}