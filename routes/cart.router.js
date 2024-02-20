import express from "express";

import {
  createCart,
  deleteCart,
  updateCart,
  getUserCart,
  getAllCart,
} from "../controllers/cart.controller.js";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/CreateCart", verifyToken, createCart);
router.put("/Cart/:id", verifyTokenAndAdmin, updateCart);
router.delete("/Cart/:id", verifyTokenAndAdmin, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);
router.get("/AllCart", verifyTokenAndAdmin, getAllCart);

export default router;
