import { useRef, useEffect } from "react";

const CardDetail = ({ cardData, setCardData, errors }) => {
  const expiryRef = useRef(null);
  const cvvRef = useRef(null);

  // ✅ Format card number va expiryga focus
  const handleCardInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setCardData((prev) => ({ ...prev, cardNumber: value }));

    if (value.replace(/\s/g, "").length === 16) {
      expiryRef.current?.focus();
    }
  };

  // ✅ Format expiry date va CVVga focus
  const handleExpiryInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2), 10);
      if (month > 12) month = 12;
      value = month.toString().padStart(2, "0") + value.slice(2);
    }
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 6);
    }
    if (value.length > 7) {
      value = value.slice(0, 7);
    }

    setCardData((prev) => ({ ...prev, expiryDate: value }));

    if (value.length === 7) {
      cvvRef.current?.focus();
    }
  };

  // ✅ CVV 3 ta raqamdan oshmasin
  const handleCvvInput = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCardData((prev) => ({ ...prev, cvv: value }));
  };

  // ✅ Expiry input focus/blur event
  useEffect(() => {
    const input = expiryRef.current;
    if (!input) return;

    const handleFocus = () => {
      input.focus();
    };
    const handleBlur = () => {
      input.type = "text";
      input.placeholder = "MM/YYYY";
    };

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);

  return (
    <div>
      <form
        className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded"
        method="POST"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Card Number */}
        <label className="block mb-4">
          <span className="font-bold text-gray-700">Card Number:</span>
          <input
            onChange={handleCardInput}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardData.cardNumber}
          />
          {errors?.cardNumber && (
            <p className="error-text">{errors.cardNumber}</p>
          )}
        </label>

        {/* Expiry Date */}
        <label className="block mb-4">
          <span className="font-bold text-gray-700">Expiry Date:</span>
          <input
            ref={expiryRef}
            onChange={handleExpiryInput}
            className="block w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="expiryDate"
            placeholder="MM/YYYY"
            value={cardData.expiryDate}
          />
          {errors?.expiryDate && (
            <p className="error-text">{errors.expiryDate}</p>
          )}
        </label>

        {/* CVV */}
        <label className="block mb-4">
          <span className="font-bold text-gray-700">CVV:</span>
          <input
            onChange={handleCvvInput}
            ref={cvvRef}
            className="block w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="cvv"
            placeholder="123"
            value={cardData.cvv}
          />
          {errors?.cvv && <p className="error-text">{errors.cvv}</p>}
        </label>
      </form>
    </div>
  );
};

export default CardDetail;
