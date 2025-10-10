import React, { useState } from "react";
import { useSelector } from "react-redux";
import Receipt from "./Receipt";
import "../style/checkout.css";
import clickIcon from "../assets/click-01.png";
import paymeIcon from "../assets/Paymeuz_logo.png";
import CardDetail from "./CardDetail";
import OrderService from "../service/order.apiService";

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paid, setPaid] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({}); // ✅ error state

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = total * 1.12;

  const handlePayment = async () => {
    // ✅ Frontend validatsiyasi (alert o‘rniga errors object)
    const newErrors = {};

    if (items.length === 0) newErrors.cart = "Your cart is empty";
    if (!paymentMethod) newErrors.paymentMethod = "Please select a payment method";

    if (
      paymentMethod !== "Click" &&
      paymentMethod !== "Payme" &&
      (!cardData.cardNumber || !cardData.expiryDate || !cardData.cvv)
    ) {
      if (!cardData.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!cardData.expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!cardData.cvv) newErrors.cvv = "CVV is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await OrderService.order({
        items: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        paymentMethod,
      });

      setPaid(true);
      setErrors({}); // ✅ Xatolarni tozalash
    } catch (error) {
      const backendErrors = {};

      // ✅ Agar backend validatsiya xatolari qaytsa
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          backendErrors[err.field] = err.message;
        });
      } else {
        backendErrors.general = "Payment failed. Please try again.";
      }

      setErrors(backendErrors);
    }
  };

  return (
    <div className="checkout-wrapper">
      <h2 className="checkout-title">Checkout</h2>

      {/* Cart Items */}
      {errors.cart && <p className="error-text">{errors.cart}</p>}
      <div className="checkout-items">
        {items.map((item) => (
          <div className="checkout-card" key={item._id}>
            <img
              src={item.image_url}
              alt={item.title}
              className="checkout-img"
            />
            <div className="checkout-info">
              <h5>{item.title}</h5>
              <p>Qty: {item.quantity}</p>
              <p className="checkout-price">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="checkout-summary">
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Tax (12%): ${(total * 0.12).toFixed(2)}</p>
        <h4>Total: ${grandTotal.toFixed(2)}</h4>
      </div>

      {/* Payment Method */}
      <div className="checkout-payment">
        <h5>Select Payment Method</h5>
        {errors.paymentMethod && (
          <p className="error-text">{errors.paymentMethod}</p>
        )}
        <div className="payment-options">
          {[
            {
              name: "PayPal",
              icon: "https://www.paypalobjects.com/webstatic/icon/pp258.png",
            },
            {
              name: "MasterCard",
              icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
            },
            {
              name: "Visa",
              icon: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
            },
            { name: "Click", icon: clickIcon },
            { name: "Payme", icon: paymeIcon },
          ].map((method) => (
            <label key={method.name} className="payment-label">
              <input
                type="radio"
                name="payment"
                value={method.name}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <img
                src={method.icon}
                alt={method.name}
                className="payment-icon"
              />
              <span>{method.name}</span>
            </label>
          ))}
        </div>
      </div>

      {paymentMethod && (
        <div className="card-details">
          <h5>Card Details</h5>
          <CardDetail cardData={cardData} setCardData={setCardData} errors={errors} />
        </div>
      )}

      {/* Pay Button */}
      {!paid ? (
        <>
          {errors.general && <p className="error-text">{errors.general}</p>}
          <button className="checkout-btn" onClick={handlePayment}>
            Pay ${grandTotal.toFixed(2)}
          </button>
        </>
      ) : (
        <Receipt items={items} total={total} paymentMethod={paymentMethod} />
      )}
    </div>
  );
};

export default Checkout;
