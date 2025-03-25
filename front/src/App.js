import { createContext, useEffect, useState } from "react";
import Router from "./Router";
import "./styles/App.css"

export const URL = "http://localhost:4000"
export const GeneralContext = createContext();
export default function App() {

  const [orders, setOrders] = useState([]);

  // טעינת הנתונים מהשרת
  useEffect(() => {
    fetch(`${URL}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
    console.log(orders);

  }, []);


  // // פונקציה למחיקת הזמנה
  // const deleteOrder = (id) => {
  //   fetch(`http://localhost:5000/api/orders/${id}`, { method: "DELETE" })
  //     .then((res) => res.json())
  //     .then(() => {
  //       setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  //     });
  // };

  return (
    <GeneralContext.Provider value={{ orders, setOrders }}>
      <Router orders={orders} />
    </GeneralContext.Provider>

  );
}
