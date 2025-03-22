import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import DashboardChart from "../components/DashboardChart";
import {
  getDashboardChartData,
  getDashboardData,
  getTotalPriceAndAveragePrice,
} from "../database/lists.js";

function Dashboard({ sidebar, lists }) {
  const [dashboardChartData, setDashboardChartData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0.0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chartData = await getDashboardChartData();
        const summary = await getDashboardData();
        const totalArr = await getTotalPriceAndAveragePrice();

        // Expecting totalArr to be an array with one object
        if (totalArr.length > 0) {
          setAveragePrice(Number(totalArr[0].AverageCost).toFixed(2));
          setTotalItems(Number(totalArr[0].TotalCost).toFixed(2));
        }

        setDashboardChartData(chartData);
        setSummaryData(summary);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // If no dashboardChartData or summaryData is returned, show Loading
  if (dashboardChartData.length === 0 || summaryData.length === 0) {
    return <h3 style={{ textAlign: "center" , marginTop: "50vh"}}>Loading...</h3>;
  }

  return (
    <div onClick={() => sidebar(false)} className="dashboard-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <div>
        <DashboardChart data={dashboardChartData} />
      </div>

      <div className="summary-statistics">
        <div className="statistic">
          <h3>Total Items</h3>
          <p>{totalItems}</p>
        </div>
        <div className="statistic">
          <h3>Average Price</h3>
          <p>{averagePrice} LE</p>
        </div>
      </div>

      <div className="item-summary">
        <h2>Item Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Avg. Price</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.Average_Price} LE</td>
                <td>{item.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
