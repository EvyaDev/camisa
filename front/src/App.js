import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import OrdersPage from "./components/OrdersPage";
import "./styles/App.css"


export default function App() {


  const [orders, setOrders] = useState([]);

  // טעינת הנתונים מהשרת
  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // פונקציה לעדכון סטטוס הזמנה
  const updateStatus = (id, newStatus) => {
    fetch(`http://localhost:5000/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          )
        );
      });
  };

  // פונקציה למחיקת הזמנה
  const deleteOrder = (id) => {
    fetch(`http://localhost:5000/api/orders/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home orders={orders} />} />
        <Route
          path="/נגריה"
          element={<OrdersPage type="נגריה" orders={orders} updateStatus={updateStatus} deleteOrder={deleteOrder} />}
        />
        <Route
          path="/מחסן"
          element={<OrdersPage type="מחסן" orders={orders} updateStatus={updateStatus} deleteOrder={deleteOrder} />}
        />
      </Routes>
    </Router>
  );
}
