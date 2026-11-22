
import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  colour: {
    type: String,
    required: true,
  },
  lengthFeet: {
    type: Number,
    required: true,
    min: 0,
  },
  widthPagalam: {
    type: Number,
    required: true,
    min: 0,
  },
  widthInches: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    design: {
      type: String,
      required: true,
    },
    shape: {
      type: String,
      enum: ["Curve", "Straight"],
      required: true,
    },
    deliveryDays: {
      type: Number,
      required: true,
    },
    variants: {
      type: [variantSchema],
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
