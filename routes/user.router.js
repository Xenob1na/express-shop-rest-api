import express from "express";

import {
  updaeteUser,
  deleteUser,
  getUser,
  getAllUser,
} from "../controllers/user.controller.js";

import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/AllUser", verifyTokenAndAdmin, getAllUser);
router.get("/User/:id", verifyTokenAndAdmin, getUser);
router.delete("/User/:id", verifyTokenAndAuthorization, deleteUser);
router.put("/User/:id", verifyTokenAndAuthorization, updaeteUser);

export default router;
