import { UserModel } from "../models/user.model.js";

export const updaeteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userUpdate = await UserModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true },
    );

    res.status(200).json({ message: "User updated successfully", userUpdate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const others = await UserModel.findById(id);

    res.status(200).json({ user: others });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const query = req.query.new;

    const users = query
      ? await UserModel.find().sort({ _id: -1 }).limit(5)
      : await UserModel.find();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
