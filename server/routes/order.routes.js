import { protect } from "../middleware/auth.middleware.js";
import EventEmitter from "events";

import express from "express";
import {
  order,
  getUserOrders,
  deleteOrder,
} from "../controllers/order.controller.js";

EventEmitter.defaultMaxListeners = 15;
const router = express.Router();

router.post("/", protect, order);
router.get("/my-orders", getUserOrders);
router.delete("/:id", protect, deleteOrder);
export default router;
