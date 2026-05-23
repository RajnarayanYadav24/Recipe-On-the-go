import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


function History() {
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

  return (
    <div className="container">
      <h2>📜 Predicted Dishes</h2>

      {history.length === 0 ? (
        <p>No history available</p>
      ) : (
        <div className="history-list">
  {history.map((item) => (
    <div className="history-item" key={item.id}>

      <div className="history-left">
        <span className="emoji">🍽️</span>
      </div>

      <div className="history-middle">
        <h3>{item.predicted_dish}</h3>
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
      )}
    </div>
  );
}

export default History;