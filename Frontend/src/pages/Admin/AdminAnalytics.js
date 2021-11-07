import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import backendServer from '../../webConfig';
import AdminNavbar from './AdminNavbar'

const AdminAnalytics = () => {
  const [chartOneData, setChartOneData] = useState({
    labels: [],
    datasets: [
      {
        data: []
      }]
  });

  const [chartTwoData, setChartTwoData] = useState({
    labels: [],
    datasets: [
      {
        data: []
      },
      {
          data: []
        },
        {
          data: []
        }]
  });
  
  const barChartOne = async () => {
    let revCnt = [];
    let datePosted = [];
   await axios
      .get(`${backendServer}/revPerDay`)
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
            revCnt.push(parseInt(dataObj.revId));
            datePosted.push(dataObj.postedDate);
        }
        setChartOneData({
          labels: datePosted,
          datasets: [
            {
              label: "review posted",
              data: revCnt,
              backgroundColor: ["Orange"],
              borderWidth: 4,
              barThickness:100
            }]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  const barChartTwo = async () => {
    let appApppliedCnt = [];
    let appRejectedCnt = [];
    let appAcceptedCnt = [];
    let compName =[];
    // let compAppliedName = [];
    // let compRejectedName = [];
    // let compAcceptedName = [];
   await axios
      .get(`${backendServer}/applicantsDetail`)
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
          if(dataObj.status === "Applied"){
            appApppliedCnt.push(parseInt(dataObj.countAppId));
            console.log(appApppliedCnt);
            // compAppliedName.push(dataObj.companyName);
          }
          else if(dataObj.status === "Rejected"){
            appRejectedCnt.push(parseInt(dataObj.countAppId));
            console.log(appRejectedCnt);
            // compRejectedName.push(dataObj.companyName);
          }
          else if(dataObj.status === "Accepted"){
            appAcceptedCnt.push(parseInt(dataObj.countAppId));
            console.log(appAcceptedCnt);
            // compAcceptedName.push(dataObj.companyName);
          }
          else {
            appApppliedCnt.push(0);
            appRejectedCnt.push(0);
            appAcceptedCnt.push(0);
          }
         if(!compName.includes(dataObj.companyName)){
          compName.push(dataObj.companyName);
         } 
        }
        setChartTwoData({
          labels: compName,
          datasets: [
            {
              label: "applicants applied",
              data: appApppliedCnt,
              backgroundColor: ["Blue"],
              borderWidth: 4,
              barThickness:100
            },
            {
              label: "applicants accepted",
              data: appAcceptedCnt,
              backgroundColor: ["Cyan"],
              borderWidth: 4,
              barThickness:100
            },
            {
              label: "applicants rejected",
              data: appRejectedCnt,
              backgroundColor: ["rgb(255, 99, 132)"],
              borderWidth: 4,
              barThickness:100
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  useEffect(() => {
    barChartOne();
    barChartTwo();
  }, []);

  return (
    <div>        
       <AdminNavbar/>
    <div className="App">
      <h1>REVIEW POSTED PER DAY</h1>
      <div>
        <Bar
          data={chartOneData}
          options={{
            responsive: true,
            title: { text: "POSTED JOBS", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div>
      <br />
      <br />
      {/* <h1>APPLICATIONS DETAILS</h1>
      <div>
        <Bar
          data={chartTwoData}
          options={{
            responsive: true,
            title: { text: "POSTED JOBS", display: true },
            scales: {
              yAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 500,
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }}
        />
      </div> */}
    </div>
    </div>
  );
};

export default AdminAnalytics;