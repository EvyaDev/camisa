import { useContext, useState } from "react";
import { GeneralContext, URL } from "../App";

export default function OrderRow({ order }) {

    const statuses = ["ממתין", "בעיבוד", "בוצע"];
    const { orders, setOrders } = useContext(GeneralContext);
    const [files, setFiles] = useState();
    const [folders, setFolders] = useState([]);
    const [path, setPath] = useState([]);

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


    function imageChange(ev) {
        const file = ev.target.files[0];
        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];

        if (!allowed.includes(file.type)) {
            alert("קובץ לא מורשה");
            return;
        }

        const reader = new FileReader();

        reader.onload = e => {
            const img = document.querySelector('img');
            img.src = e.target.result;
            img.style.display = 'block';
        }

        reader.readAsDataURL(file);
        setFiles(file);
    }

    function uploadImage(ev) {
        ev.preventDefault();

        const file = files; // גישה לקובץ שנבחר
        if (!file) {
            alert("לא נבחר קובץ.");
            return;
        }

        const allowed = ['image/jpg', 'image/jpeg', 'image/png'];
        if (!allowed.includes(file.type)) {
            alert("קובץ לא מורשה");
            return;
        }

        const data = new FormData();
        data.append('myFile', file); // הוספת הקובץ ל-FormData

        fetch(`${URL}/files/upload`, {
            method: 'POST',
            body: data,
        })
            .then(response => response.json())  // עליך לוודא שהשרת מחזיר JSON
            .then(data => {
                if (data.success) {
                    alert("הקובץ עלה בהצלחה!");
                    // עדכון התמונה בצד הלקוח אם צריך
                } else {
                    alert("שגיאה בהעלאת הקובץ");
                }
            })
            .catch(error => {
                console.error("שגיאה בהעלאת קובץ:", error);
                alert("שגיאה בהעלאת קובץ");
            });
    }



    return (
        <tr>
            <td>{order.sku}</td>
            <td>{order.type}</td>
            <td>{order.client}</td>
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
                <button onClick={() => deleteOrder(order.id)}>
                    מחק
                </button>
                <form onSubmit={uploadImage} encType="multipart/form-data">
                    <input type="file" name="myFile" onChange={imageChange} />
                    <input type="submit" />
                </form>
                <img></img>
            </td>
        </tr>
    );
}
