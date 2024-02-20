import express from "express";

import {
  createProduct,
  getProducts,
  getAllProducts,
  updateProducts,
  deleteProducts,
} from "../controllers/product.controller.js";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/CreateProduct", verifyTokenAndAdmin, createProduct);
router.get("/AllProduct", getAllProducts);
router.get("/Product/:id", getProducts);
router.put("/Product/:id", verifyTokenAndAdmin, updateProducts);
router.delete("/Product/:id", verifyTokenAndAdmin, deleteProducts);

export default router;
