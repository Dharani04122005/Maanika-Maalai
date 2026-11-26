
import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import { sendOrderEmails } from "../services/emailService.js";

const router = express.Router();

// Calculate shipping on the backend
const calculateShipping = (state, district) => {
  const normalizedState = state.trim().toLowerCase();
  const normalizedDistrict = district.trim().toLowerCase();

  if (normalizedState === "tn") {
    if (
      normalizedDistrict === "kanyakumari" ||
      normalizedDistrict === "kanniyakumari"
    ) {
      return 50;
    }

    return 100;
  }

  return 200;
};

// Create new order
router.post("/", async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const { address, cartItems } = req.body;

    if (!address || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order details.",
      });
    }

    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "doorNo",
      "street",
      "city",
      "district",
      "state",
      "pincode",
    ];

    for (const field of requiredFields) {
      if (!String(address[field] || "").trim()) {
        return res.status(400).json({
          success: false,
          message: `Please provide ${field}.`,
        });
      }
    }

    const preparedItems = [];
    let subtotal = 0;

    await session.withTransaction(async () => {
      for (const item of cartItems) {
        if (
          !mongoose.Types.ObjectId.isValid(item.productId) ||
          !Number.isInteger(item.quantity) ||
          item.quantity < 1 ||
          !Number.isFinite(Number(item.lengthFeet)) ||
          !Number.isFinite(Number(item.widthInches)) ||
          !String(item.colour || "").trim()
        ) {
          throw new Error("Invalid product or quantity.");
        }

        const product = await Product.findById(item.productId).session(session);

        if (!product) {
          throw new Error("A product in your cart no longer exists.");
        }

        const variant = product.variants.find(
          (v) =>
            v.colour === item.colour &&
            v.lengthFeet === Number(item.lengthFeet) &&
            v.widthInches === Number(item.widthInches) &&
            v.isAvailable === true
        );

        if (!variant) {
          throw new Error(`${product.name}: Selected variation is unavailable.`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(
            `${product.name}: Only ${variant.stock} item(s) are available.`
          );
        }

        // Reduce stock safely inside the transaction
        const stockUpdate = await Product.updateOne(
          {
            _id: product._id,
          },
          {
            $inc: {
              "variants.$[selected].stock": -item.quantity,
            },
          },
          {
            arrayFilters: [
              {
                "selected.colour": item.colour,
                "selected.lengthFeet": Number(item.lengthFeet),
                "selected.widthInches": Number(item.widthInches),
                "selected.isAvailable": true,
                "selected.stock": { $gte: item.quantity },
              },
            ],
            session,
          }
        );

        if (stockUpdate.modifiedCount !== 1) {
          throw new Error(
            `${product.name}: Stock changed. Please refresh your cart.`
          );
        }

        const itemTotal = variant.price * item.quantity;
        subtotal += itemTotal;

        preparedItems.push({
          productId: product._id,
          name: product.name,
          image: product.image,
          colour: variant.colour,
          lengthFeet: variant.lengthFeet,
          widthPagalam: variant.widthPagalam,
          widthInches: variant.widthInches,
          price: variant.price,
          quantity: item.quantity,
        });
      }

      const shipping = calculateShipping(
        address.state,
        address.district
      );

      const total = subtotal + shipping;

      const orderNumber =
        "MM" +
        Date.now().toString() +
        Math.floor(1000 + Math.random() * 9000);

      const [order] = await Order.create(
        [
          {
            orderNumber,
            customer: {
              fullName: address.fullName.trim(),
              phone: address.phone.trim(),
              email: address.email.trim(),
            },
            address: {
              doorNo: address.doorNo.trim(),
              street: address.street.trim(),
              area: (address.area || "").trim(),
              city: address.city.trim(),
              district: address.district.trim(),
              state: address.state.trim(),
              pincode: address.pincode.trim(),
              landmark: (address.landmark || "").trim(),
            },
            items: preparedItems,
            subtotal,
            shipping,
            total,
          },
        ],
        { session }
      );

      // Keep response data available after transaction
      req.createdOrder = order;
    });
    // Send email notifications after order is saved
try {
  await sendOrderEmails(req.createdOrder);
  console.log("Order emails sent successfully!");
} catch (emailError) {
  console.error("Email Notification Failed:", emailError.message);
}

    return res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: req.createdOrder,
    });
  } catch (error) {
    console.error("Order Creation Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message || "Unable to place order.",
    });
  } finally {
    await session.endSession();
  }
});

export default router;
