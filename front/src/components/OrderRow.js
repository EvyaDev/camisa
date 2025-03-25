import { useContext } from "react";
import { GeneralContext, URL } from "../App";

export default function OrderRow({ order }) {

    const statuses = ["ממתין", "בעיבוד", "בוצע"];
    const { orders, setOrders } = useContext(GeneralContext);


    // פונקציה לעדכון סטטוס הזמנה
    const updateStatus = (id, newStatus) => {

        fetch(`${URL}/order/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        })
            .then((res) => res.json())
            .then(() => {
                // עדכון הסטטוס של ההזמנה בתוך הסטייט
                setOrders(orders.map(order =>
                    order.id === id ? { ...order, status: newStatus } : order
                ));
            });
    };



    function deleteOrder(id) {
        fetch(`${URL}/del-order/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())

    }



    return (
        <tr>
            <td>{order.sku}</td>
            <td>{order.type}</td>
            <td>
                <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}>
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </td>
            <td>
                <button onClick={() => deleteOrder(order.id)} style={{ color: "red" }}>
                    מחק
                </button>
            </td>
        </tr>
    );
}
