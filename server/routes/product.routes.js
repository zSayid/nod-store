import express from "express";
// import { protect } from "../middleware/auth.middleware.js";
import { getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
// router.get("/:id", getProductById); // 

export default router;
