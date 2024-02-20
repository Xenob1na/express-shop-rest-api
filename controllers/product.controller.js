import { ProductModel } from "../models/products.model.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);

    const savedProduct = await newProduct.save();
    res
      .status(200)
      .json({ message: "Product created successfully", savedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await ProductModel.findById(id);

    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;

    if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await ProductModel.find({
        category: {
          $in: [qCategory],
        },
      });
    } else {
      products = await ProductModel.find();
    }

    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const productsUpdate = await ProductModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      productsUpdate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
