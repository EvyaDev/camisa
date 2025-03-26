import OrderRow from "./OrderRow";
import "../styles/OrdersPage.css"

export default function OrdersPage({ type, orders, updateStatus, deleteOrder }) {
    const filteredOrders = orders.filter((order) => order.type === type);


    return (
        <div className="orders-container">
            <h2>הזמנות {type}</h2>
            <table>
                <thead>
                    <tr>
                        <th>מספר הזמנה</th>
                        <th>סוג</th>
                        <th>שם לקוח</th>
                        <th>סטטוס</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order) => (
                        <OrderRow key={order.id} order={order} updateStatus={updateStatus} deleteOrder={deleteOrder} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
