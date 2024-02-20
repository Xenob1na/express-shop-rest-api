import { CartModel } from "../models/cart.model.js";

export const createCart = async (req, res) => {
  try {
    const newCart = new CartModel(req.body);

    const savedCart = await newCart.save();

    res.status(200).json({ message: "Cart created successfully", savedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await CartModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartUpdate = await CartModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({ message: "Cart updated successfully", cartUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await CartModel.findOne({ userId: userId });

    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCart = async (req, res) => {
  try {
    const cart = CartModel.find();

    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
