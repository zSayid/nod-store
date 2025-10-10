import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Amazon",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      price: {
        type: Number,
        required: false
      }
    }
  ],
  paymentMethod: {
    type: String,
    enum: ["PayPal", "Visa", "MasterCard", "Click", "Payme"],
  },
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  terminal: {
    type: String,
    default: "NodirShop Terminal #001"
  },
  receiptId: {
    type: String,
    default: () => `R-${Date.now()}`
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", orderSchema);