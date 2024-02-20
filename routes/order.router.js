import express from "express";

import {
  createOrder,
  updateOrder,
  deleteOrder,
  getUserOrders,
  getAllOrder,
} from "../controllers/order.controller.js";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/CreateOrder", verifyToken, createOrder);
router.put("/Order/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/Order/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders);
router.get("/AllUserOrder", verifyTokenAndAdmin, getAllOrder);

export default router;
