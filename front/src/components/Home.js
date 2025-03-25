import { Link } from "react-router-dom";
import "../styles/Home.css"

export default function Home({ orders }) {
    const countOrders = (type) => orders.filter(order => order.type === type && order.status !== "בוצע").length;

    return (
        <div>
            <h1>ניהול הזמנות עבודה</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/נגריה">הזמנות נגריה ({countOrders("נגריה")})</Link>
                    </li>
                    <li>
                        <Link to="/מחסן">הזמנות מחסן ({countOrders("מחסן")})</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
