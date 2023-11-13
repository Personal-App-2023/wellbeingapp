import React, { useState,useEffect } from "react";
import "../styles/Report.css";
import PieChart from "../components/PieChart";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useSelector } from "react-redux";

Chart.register(CategoryScale);

export default function Report(){
    const profile = useSelector((state) => state.theStore.value);
    const [message, setMessage] = useState("");
    const [chartData, setChartData] = useState({
        labels: [],
        /*labels: data.map(row => row.emotion),*/
        datasets: [
          {
            label: "Emotions",
            data: [],
            /*data: data.map(row => row.percentage),*/
            /*backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],*/
            borderColor: "black",
            borderWidth: 1
          }
        ]
      });
      const fetchUserData = () => {
        //fetch(`http://localhost:9094/api/emotions/${profile.id}`)
        fetch(`http://k8s-default-awsingre-23c3bc0850-121321573.us-east-2.elb.amazonaws.com/personal/emotions/${profile.id}`)
          .then(response => {
            if (response.ok) {
                console.log('response',response);
                return response.json();
            }
            throw new Error('Connection with reporting service failed');
          })
          .then(data => {
            console.log('data',data);
            setChartData({
                /*labels: ['laziness', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],*/
                labels: data.map(row => row.emotion),
                datasets: [
                  {
                    label: "Emotions",
                    /*data: [12, 19, 3, 5, 2, 3],*/
                    data: data.map(row => row.percentage),
                    backgroundColor: ['#CB4335', '#1F618D', '#F1C40F', '#27AE60', '#884EA0', '#D35400'],
                    color: "white",
                    borderColor: "white",
                    borderWidth: 1
                  }
                ]
              })
          })
          .catch((error) => {
            console.log('error',error);
            setMessage('Connection with reporting service failed');
          });
      }
    
      useEffect(() => {
        fetchUserData()
      }, [])

    return(
        <div>
            {message===''?<PieChart chartData={chartData} />:<h6 className="error">{message}</h6>}
            
         </div>
    );
}