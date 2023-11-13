import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import Dummy from "../images/dummy.png";
import Emotions from "../components/Emotions";
import "../styles/New.css";
import { useSelector } from "react-redux";
import ReactGA from 'react-ga';

export default function New(){
  const [pthought, setPositiveThought] = useState("");
  const [nthought, setNegativeThought] = useState("");
  //const [nfeelings, setNegativeFeelings] = useState([{emotion:'',percentage:0}]);
  //const [pfeelings, setPositiveFeelings] = useState([{emotion:'',percentage:0}]);
  const [nfeelings, setNegativeFeelings] = useState([]);
  const [pfeelings, setPositiveFeelings] = useState([]);
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState("");
  //emotions hooks
  const [type, setType] = useState('0');
  const [uitype, setUitype] = useState('0');
  const [emotion, setEmotion] = useState('');
  const [percent, setPercent] = useState(0);

  const profile = useSelector((state) => state.theStore.value);

    return(
        <>
        <h6 className="header">Start typing your thoughts here</h6>
          <div className="new-div">
          <form className="new-form mb-3">
            <div className="mb-3">
              <div className="input-group">
                <label htmlFor="type" className="type form-label">Thoughts Type</label>
                <select defaultValue="2" id="type" className="light form-select" aria-label="Default select example"
                  onChange={(e) => {setUitype(e.target.value);console.log('type',uitype==='0');}}>
                  <option value="2">Please select</option>
                  <option value="1">Positive thought</option>
                  <option value="0">Negative thought</option>
                </select>
              </div>
            </div>
            {uitype==='0'?
          <>
          <div className="small mb-3">
              <textarea className="light form-control" id="nve" value={nthought} placeholder="Negative thought"
                onChange={(e) => setNegativeThought(e.target.value)}/>
              <div className="mb-3">
                <label className="form-label">Emotions</label>
                <div className="input-group">
                  <Emotions feelings={nfeelings}/>
                  <div className="mb-3">
                  <button type="submit" className="add-btn btn btn-primary" 
                  data-bs-toggle="modal" data-bs-target="#emotionsModal"
                  onClick={(e)=>{
                    e.preventDefault();
                    setType('0');
                    //setNegativeFeelings([...nfeelings, {emotion: 'n',percentage: 40}]);
                    //console.log('nfeelings',nfeelings);
                    ReactGA.event(
                      {category:"New", action:"AddMobileNEmotion", label:"0"}
                      );
                  }}>+</button>
                  </div>
                </div>
              </div>
            </div> 
            <div className="large mb-3 input-group">
            <textarea className="light form-control" id="nve" value={nthought} placeholder="Negative thought"
              onChange={(e) => setNegativeThought(e.target.value)}/>
            <div className="mb-3">
              <label className="form-label">Emotions</label>
              <div className="input-group">
                <Emotions feelings={nfeelings}/>
                <div className="mb-3">
                <button type="submit" className="add-btn btn btn-primary" 
                data-bs-toggle="modal" data-bs-target="#emotionsModal"
                onClick={(e)=>{
                  e.preventDefault();
                  setType('0');
                  //setNegativeFeelings([...nfeelings, {emotion: 'n',percentage: 40}]);
                  //console.log('nfeelings',nfeelings);
                  ReactGA.event(
                    {category:"New", action:"AddWebNEmotion", label:"0"}
                    );
                }}>+</button>
                </div>
              </div>
            </div>
          </div>
          </>
            : <></>
            }
            <>
            <div className="small mb-3">
              <textarea className="light form-control" id="pve" value={pthought} placeholder="Positive thought"
               onChange={(e) => setPositiveThought(e.target.value)}/>
              <div className="mb-3">
                <label className="form-label">Emotions</label>
                <div className="input-group">
                  <Emotions feelings={pfeelings}/>
                  <div className="mb-3">
                  <button type="submit" className="add-btn btn btn-primary" 
                  data-bs-toggle="modal" data-bs-target="#emotionsModal"
                  onClick={(e)=>{
                    e.preventDefault();
                    setType('1');
                    //setPositiveFeelings([...pfeelings, {emotion: 'y',percentage: 20}]);
                    //console.log('pfeelings',pfeelings);
                    ReactGA.event(
                      {category:"New", action:"AddMobilePEmotion", label:"1"}
                      );
                  }}>+</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="large mb-3 input-group">
              <textarea className="light form-control" id="pve" value={pthought} placeholder="Positive thought"
               onChange={(e) => setPositiveThought(e.target.value)}/>
              <div className="mb-3">
                <label className="form-label">Emotions</label>
                <div className="input-group">
                  <Emotions feelings={pfeelings}/>
                  <div className="mb-3">
                  <button type="submit" className="add-btn btn btn-primary" 
                  data-bs-toggle="modal" data-bs-target="#emotionsModal"
                  onClick={(e)=>{
                    e.preventDefault();
                    setType('1');
                    ReactGA.event(
                      {category:"New", action:"AddWebPEmotion", label:"1"}
                      );
                    //setPositiveFeelings([...pfeelings, {emotion: 'y',percentage: 20}]);
                    //console.log('pfeelings',pfeelings);
                  }}>+</button>
                  </div>
                </div>
              </div>
            </div>
            </>
            <button type="submit" className="submit btn btn-primary"
             onClick={async (e)=>{
              e.preventDefault();
              if(uitype==='0' && (!pthought || !nthought || pfeelings.length===0 || nfeelings.length===0))
                setMessage("Missing required fields");
              else if(uitype==='1' && (!pthought || pfeelings.length===0))
                setMessage("Missing required fields");
              else{
                try {
                  //let res = await fetch('http://localhost:9094/api/thought', {
                  let res = await fetch('http://k8s-default-awsingre-23c3bc0850-121321573.us-east-2.elb.amazonaws.com/personal/thought', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: uitype==='0' ? 
                    JSON.stringify({
                      'userId': profile.id,
                      'thoughtsList': [
                          {
                              'thought': nthought,
                              'type': '-',
                              'feelings': nfeelings
                          },
                          {
                              'thought': pthought,
                              'type': '+',
                              'feelings': pfeelings
                          }
                      ]
                  }) :
                  JSON.stringify({
                    'userId': profile.id,
                    'thoughtsList': [
                        {
                            'thought': pthought,
                            'type': '+',
                            'feelings': pfeelings
                        }
                    ]
                })
                  });
                  let resJson = await res.json();
                  if (res.status === 200) {
                    setMessage(null);
                    setConfirm("New insights created successfully");
                    //GA
                    ReactGA.event(
                      {category:"New", action:"SubmitSuccess", label:uitype}
                      );
                  } else {
                    setMessage("Some error occured");
                    //GA
                    ReactGA.event(
                      {category:"New", action:"SubmitError", label:uitype}
                      );
                  }
                } catch (err) {
                  console.log(err);
                  setMessage("Some error occured");
                  //GA
                  ReactGA.event(
                    {category:"New", action:"SubmitError", label:uitype}
                    );
                }
            }
             }}>Submit</button>
             
             {message ? <div className="message"> <p>{message}</p> </div>: null}
             {confirm ? <div className="confirm"> <p>{confirm}</p> </div>: null}
          </form>
          </div>
          <div className="modal fade" id="emotionsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="light modal-content">
              <div className="light modal-header">
                <h6 className="modal-title fs-5" id="exampleModalLabel">Add Emotion</h6>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="light modal-body">
                <div className="light mb-3 input-group">
                  <select defaultValue="0" id="type" className="emotion form-select w-50" placeholder="Emotion"
                    onChange={(e) => setEmotion(e.target.value)}>
                    <option value="0">Select emotion</option>
                    <option value="Affection">Affection</option>
                    <option value="Anger">Anger</option>
                    <option value="Annoyance">Annoyance</option>
                    <option value="Anxiety">Anxiety</option>
                    <option value="Boredom">Boredom</option>
                    <option value="Compassion">Compassion</option>
                    <option value="Contempt">Contempt</option>
                    <option value="Disappointment">Disappointment</option>
                    <option value="Disgust">Disgust</option>
                    <option value="Embarrassment">Embarrassment</option>
                    <option value="Envy">Envy</option>
                    <option value="Fear">Fear</option>
                    <option value="Frustration">Frustration</option>
                    <option value="Guilt">Guilt</option>
                    <option value="Happiness">Happiness</option>
                    <option value="Hatred">Hatred</option>
                    <option value="Loneliness">Loneliness</option>
                    <option value="Love">Love</option>
                    <option value="Pride">Pride</option>
                    <option value="Sadness">Sadness</option>
                    <option value="Satisfaction">Satisfaction</option>
                    <option value="Self-confidence">Self-confidence</option>
                    <option value="Shame">Shame</option>
                    <option value="Surprise">Surprise</option>
                    <option value="Positive">Positive</option>
                  </select>
                  <label className="percentlbl form-label" htmlFor="points">Percentage: </label>
                  <input type="number" className="percent form-control" id="points" name="points"
                    onChange={(e) => setPercent(e.target.value)}></input>
                </div>
              </div>
              <div className="light modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={(e)=>{
                  //positive feeling
                  if(type==='1')
                  {
                    setPositiveFeelings([...pfeelings, {emotion: emotion,percentage: percent}]);
                    console.log('pfeelings',pfeelings);
                  }
                  //negative feeling
                  else if(type==='0')
                  {
                    setNegativeFeelings([...nfeelings, {emotion: emotion,percentage: percent}]);
                    console.log('nfeelings',nfeelings);
                  }
                  ReactGA.event(
                    {category:"New", action:"SaveEmotion", label:emotion, value:percent}
                    );
                }}>Save</button>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}