import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Dashboard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 Calculate stats
  const totalSearches = history.length;
  const lastSearch = history[0];

  const dishCount = {};
  history.forEach((item) => {
    dishCount[item.predicted_dish] =
      (dishCount[item.predicted_dish] || 0) + 1;
  });

  const mostFrequentDish =
    Object.keys(dishCount).length > 0
      ? Object.keys(dishCount).reduce((a, b) =>
          dishCount[a] > dishCount[b] ? a : b
        )
      : "N/A";

  return (
    <div className="container">
      <h2 style={{ marginBottom: "20px" }}>📊 Dashboard</h2>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card">
          <p className="stat-title">Total Searches</p>
          <h2>{totalSearches}</h2>
        </div>

        <div className="stat-card">
          <p className="stat-title">Top Dish</p>
          <h2>{mostFrequentDish.replace(/_/g, " ")}</h2>
        </div>

        <div className="stat-card">
          <p className="stat-title">Last Prediction</p>
          <h2>
            {lastSearch?.predicted_dish
            ? lastSearch.predicted_dish.replace(/_/g, " ")
            : "N/A"}
            </h2>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <h3 style={{ marginTop: "30px" }}>Recent Activity</h3>

      <div className="history-list">
        {history.slice(0, 5).map((item) => (
          <div className="history-item" key={item.id}>
            <div className="history-left">
              <span className="emoji">🍽️</span>
            </div>

            <div className="history-middle">
              <h3>{item.predicted_dish.replace(/_/g, " ")}</h3>
              <p className="ingredients-text">
                {item.ingredients}
              </p>
            </div>

            <div className="history-right">
              {item.confidence}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;