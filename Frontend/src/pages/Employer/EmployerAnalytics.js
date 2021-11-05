import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import backendServer from '../../webConfig';
import EmployerNavbar from './EmployerNavbar'

const ReportEmployer = () => {
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
      }]
  });
  
  const barChartOne = async () => {
    let jobCnt = [];
    let empName = [];
   await axios
      .get(`${backendServer}/jobPosted`)
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
          jobCnt.push(parseInt(dataObj.countJobId));
          empName.push(dataObj.name);
        }
        setChartTwoData({
          labels: empName,
          datasets: [
            {
              label: "job posted",
              data: jobCnt,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log(jobCnt, empName);
  };

  const barChartTwo = async () => {
    let appCnt = [];
    let compName = [];
   await axios
      .get(`${backendServer}/applicantsDetail`)
      .then(res => {
        // console.log(res);
        for (const dataObj of res.data) {
          appCnt.push(parseInt(dataObj.countAppId));
          compName.push(dataObj.companyName);
        }
        setChartOneData({
          labels: compName,
          datasets: [
            {
              label: "jobs applied",
              data: appCnt,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
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
    <div className="App">
         <EmployerNavbar/>
      <h1>JOB POSTED IN A YEAR</h1>
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

      <h1>APPLICATIONS ACCEPTED/REJECTED</h1>
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
    </div>
  );
};

export default ReportEmployer;