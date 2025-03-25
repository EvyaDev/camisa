import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import OrdersPage from './components/OrdersPage';

export default function Router({ orders }) {



    // // פונקציה למחיקת הזמנה
    // const deleteOrder = (id) => {
    //     fetch(`http://localhost:5000/api/orders/${id}`, { method: "DELETE" })
    //         .then((res) => res.json())
    //         .then(() => {
    //             setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    //         });
    // };


    return (
        <Routes >
            <Route path="/" element={<Home orders={orders} />} />
            <Route
                path="/נגריה"
                element={<OrdersPage type="נגריה" orders={orders} />}
            />
            {/* <Route
                path="/מחסן"
                element={<OrdersPage type="מחסן" orders={orders} updateStatus={updateStatus} deleteOrder={deleteOrder} />}
            /> */}
            {/* <Route
                path="/נגריה"
                element={<OrdersPage type="נגריה" orders={orders} updateStatus={updateStatus} deleteOrder={deleteOrder} />}
            />
            <Route
                path="/מחסן"
                element={<OrdersPage type="מחסן" orders={orders} updateStatus={updateStatus} deleteOrder={deleteOrder} />}
            /> */}
        </Routes>
    )
}
