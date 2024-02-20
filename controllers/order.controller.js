import { OrderModel } from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);

    const savedOrder = await newOrder.save();

    res.status(200).json({ message: "Order created successfully", savedOrder });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const orderUpdate = await OrderModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Order updated successfully", orderUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await OrderModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const order = await OrderModel.find({ userId: userId });

    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
