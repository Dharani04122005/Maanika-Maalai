
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  image: { type: String, required: true },
  colour: { type: String, required: true },
  lengthFeet: { type: Number, required: true },
  widthPagalam: { type: Number, required: true },
  widthInches: { type: Number, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },

    address: {
      doorNo: { type: String, required: true },
      street: { type: String, required: true },
      area: { type: String, default: "" },
      city: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: { type: String, default: "" },
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true },
    total: { type: Number, required: true },

    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"],
      default: "Placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
