import { useEffect, useState } from "react";
import axios from "../service/api";
import { getItem } from "../helpers/persistence-storage";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = getItem("token");

  useEffect(() => {
    if (!token) return; // if no token, do nothing

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/orders/my-orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Buyurtmalarni olishda xatolik:", err.message);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5 pt-5 text-center text-danger">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="order-card mb-4 p-3 border rounded shadow-sm bg-light"
          >
            <div className="d-flex justify-content-between flex-wrap">
              <h5>Order ID: {order.receiptId}</h5>
              <p className="text-muted">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="order-items mt-2">
              {order.items.map((item) => {
                const price = item.product.price || item.product.Price || 0;
                return (
                  <div
                    key={item._id}
                    className="d-flex align-items-center mb-2 p-2 bg-white rounded shadow-sm flex-wrap"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "10px",
                        borderRadius: "8px",
                      }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{item.product.title}</h6>
                      <p className="mb-0 text-muted">
                        Qty: {item.quantity} × ${price.toFixed(2)}
                      </p>
                    </div>
                    <strong>${(price * item.quantity).toFixed(2)}</strong>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 text-end">
              <p className="mb-1">
                Subtotal: $
                {order?.subtotal ? order.subtotal.toFixed(2) : "0.00"}
              </p>
              <p className="mb-1">
                Tax (12%): ${order?.tax ? order.tax.toFixed(2) : "0.00"}
              </p>
              <h5 className="mt-2">
                Total: ${order?.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
              </h5>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
