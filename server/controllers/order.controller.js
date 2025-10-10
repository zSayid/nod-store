import Order from "../model/order.model.js";
import Product from "../model/product.model.js";

export const order = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      const qty = item.quantity || 1;
      const itemTotal = product.price * qty;

      subtotal += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: qty,
      });
    }

    const tax = parseFloat((subtotal * 0.12).toFixed(2));
    const totalPrice = parseFloat((subtotal + tax).toFixed(2));

    const newOrder = new Order({
      user: req.user._id,
      items: orderItems,
      paymentMethod,
      subtotal,
      tax,
      totalPrice,
    });

    await newOrder.save();
    await newOrder.populate("items.product");

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }) 
      .populate("items.product") // Mahsulot ma'lumotlarini olish
      .sort({ createdAt: -1 }); // Yangi buyurtmalar birinchi bo‘lib ko‘rsatiladi

    res.status(200).json(orders);
  } catch (error) {
    console.error("getUserOrders error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order)  {
      return res.status(404).json({message: "Order not found"});
    }
    
  } catch (error) {
    res.status(500).json({ message: "Server error" });    
  }
}
