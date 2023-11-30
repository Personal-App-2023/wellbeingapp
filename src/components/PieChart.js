import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import "../styles/Chart.css";
import ReactGA from 'react-ga4';
import $ from 'jquery';

function PieChart({ chartData }) {
    const profile = useSelector((state) => state.theStore.value);
    const [emotion, setEmotion] = useState("");
    const [quote, setQuote] = useState(null);
    const [thoughts, setThoughts] = useState([]);

    React.useEffect(() => {
      if(!quote)
        getDailyQuote();
    }, []);
  
    React.useEffect(() => {
      if (quote) {
        console.log(quote);
      }
    }, [quote]);

    const getDailyQuote = async () => {
          try {
              //let res = await fetch(`https://quotes.rest/qod.json?category=inspire&api_key=Q3yDonTV1lfaFMXwKsu4BskSnQmypWzCFNqOxEz3`, {
                let res= await fetch('https://api.quotable.io/random?tags=[Inspirational]', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  //'X-Theysaidso-Api-Secret': 'Q3yDonTV1lfaFMXwKsu4BskSnQmypWzCFNqOxEz3',
                }
              });
              let resJson = await res.json();
              if (res.status === 200) {
                console.log("Loaded Quote");
                console.log(resJson);
                console.log(resJson.content);
                setQuote(resJson.content);
              } else {
                console.log("Some error occured");
                ReactGA.event(
                  {category:"Chart", action:"DailyQuoteError"}
                  );
              }
            } catch (err) {
              console.log(err);
              ReactGA.event(
                {category:"Chart", action:"DailyQuoteError"}
                );
            }
          
      };

    const onClick = async (event,element) => {
        if(element.length > 0)
          {
            var ind = element[0].index;
            let tempemotion=chartData.labels[ind];
            setEmotion(tempemotion);
            try {
                //let res = await fetch(`http://localhost:9094/api/thoughts/${profile.id}/${tempemotion}`, {
                let res = await fetch(`http://k8s-default-awsingre-23c3bc0850-121321573.us-east-2.elb.amazonaws.com/personal/thoughts/${profile.id}/${tempemotion}`, {
                  method: 'GET',
                 /* headers: {
                    'Content-Type': 'application/json',
                  }*/
                });
                let resJson = await res.json();
                if (res.status === 200) {
                  console.log("Loaded thoughts");
                  setThoughts(resJson);
                } else {
                  console.log("Some error occured");
                  console.log(res.status);
                  ReactGA.event(
                    {category:"Chart", action:"ViewEmotionError", label:tempemotion}
                    );
                }
              } catch (err) {
                console.log(err);
                ReactGA.event(
                  {category:"Chart", action:"ViewEmotionError", label:tempemotion}
                  );
              }
              ReactGA.event(
                {category:"Chart", action:"ViewEmotion", label:tempemotion}
                );
            window.$('#thoughtsModal').modal('show');
            }
      };
  return (
    <>
    <div className="chart-container">
      {quote?<div className="quote-wrapper"><p className="quote-div">Quote of the day: {quote}</p></div>:<></>}
      <h2 style={{ textAlign: "center" }}>Your monthly emotions</h2>
      <div className="pie-div">
      <Pie
        data={chartData}
        width={50}
        height={20}
        options={{
            onClick: onClick,
           maintainAspectRatio: false, 
           responsive: true,
           color: "white",
           /*aspectRatio: 2,*/
          plugins: {
            title: {
              display: true,
              text: "Monthly Emotions - Click Me",
              color: "white"
            },
            labels:{
              color: ['white']
            }
          }
        }}
      />
      </div>
    </div>
    <div className="modal fade" id="thoughtsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">'{emotion}' Thoughts</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="thougt-modal modal-body">
            <table>
            <tbody>
            {thoughts.map( (item,i) => 
                <tr key={i}><td><span><b>{'Thought: '}</b>{item.thought}</span>
                <span key={i}><b>{'Type: '}</b>{item.type==='-'?'Negative':'Positive'}</span>
                <span><b>{'Emotions: '}</b>
                    {item.feelings.map((itemem,j)=> itemem.emotion + (j<item.feelings.length-1?' - ':''))}
                </span>
                </td></tr> )} 
            </tbody>
            </table>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}
export default PieChart;