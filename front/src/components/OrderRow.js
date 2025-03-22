export default function OrderRow({ order, updateStatus, deleteOrder }) {
    const statuses = ["ממתין", "בעיבוד", "בוצע"];

    return (
        <tr>
            <td>{order.id}</td>
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
