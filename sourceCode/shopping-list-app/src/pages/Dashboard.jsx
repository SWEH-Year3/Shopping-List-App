import React, { useState , useEffect} from "react";
import "../styles/Dashboard.css"; 
import DashboardChart from "../components/DashboardChart";
import { getDashboardChartData, getDashboardData, getTotalPriceAndAveragePrice}  from '../database/lists.js';

function Dashboard({ sidebar,lists }) {
//   const totalItems = lists.reduce((sum, list) => sum + (list.items?.length || 0), 0);

//   const totalPrice = lists.reduce((sum, list) => {
//     return sum + (list.items?.reduce((listSum, item) => listSum + (item.price   || 0), 0) || 0);
//   }, 0);
//   const averagePrice = totalItems > 0 ? (totalPrice / totalItems).toFixed(2) : 0;

//   const itemSummary = lists.reduce((acc, list) => {
//     list.items?.forEach((item) => {
//       if (!acc[item.name]) {
//         acc[item.name] = { totalQuantity: 0, totalPrice: 0, count: 0 };
//       }
//       acc[item.name].totalQuantity +=  item.quantity || 0;
//       acc[item.name].totalPrice += item.price   || 0;
//       acc[item.name].count += 1;
//     });
//     return acc;
//   }, {});

//   const itemSummaryArray = Object.entries(itemSummary).map(([name, data]) => ({
//     name,
//     avgPrice: (data.totalPrice / data.totalQuantity).toFixed(2),
//     totalQuantity: data.totalQuantity,
//   }));
    
    /*
    1. get dashboard chart data
    2. get summary data
    3. assign them
    */
    const [dashboardChartData, setDashboardChartData] = useState([]);
    const [summaryData, setSummaryData] = useState([]);
    const [totalItems, settotalQuantity] = useState(0);
    const [averagePrice, settotalPrice] = useState(0.0);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const chartData = await getDashboardChartData();
          const summary = await getDashboardData();
          const total = await getTotalPriceAndAveragePrice(); 
          settotalPrice(total.AverageCost.toFixed(2));
          settotalQuantity(total.TotalCost.toFixed(2));  
          setDashboardChartData(chartData);
          setSummaryData(summary);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);
    if (dashboardChartData.length === 0 || summaryData.length === 0) {
      return <div>Loading...</div>;
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