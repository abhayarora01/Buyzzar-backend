const mongoose = require("mongoose");
const express = require("express");
const Order = require("../models/order.models");
const User = require("../models/userModel");
const Product = require("../models/productModel"); // ✅ Product model import
const { sendOrderConfirmationEmail } = require("../utils/sendEmail");
const authToken = require("../middleware/authToken");


const router = express.Router();

// 📦 Fetch orders for a specific user
router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // 🛠️ Cast string to ObjectId
        const objectId = new mongoose.Types.ObjectId(userId);

        const orders = await Order.find({ userId: objectId })
            .sort({ createdAt: -1 })
            .populate("items.productId")
            .populate("userId");

        console.log("📦 Orders fetched:", orders);

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found." });
        }

        res.json({ success: true, orders });
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
});


// 💾 Save new order and send confirmation email
router.post("/save", authToken, async (req, res) => {
    try {
        const { items, totalAmount, paymentId } = req.body;
        const userId = req.userId;


        // ✅ Inject price for each item from DB
        const itemsWithPrice = await Promise.all(
            items.map(async (item) => {
                const product = await Product.findById(item.productId);
                if (!product) {
                    throw new Error(`Product not found: ${item.productId}`);
                }

                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.sellingPrice || product.price, // Use whichever field you store price in
                };
            })
        );

        // ✅ Save order to DB
        const newOrder = await Order.create({
            // ✅ Correct
            userId,
            items: itemsWithPrice,
            totalAmount,
            paymentId,
            status: "Paid",
        });

        // ✅ Get user info
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // ✅ Send confirmation email
        await sendOrderConfirmationEmail(user.email, {
            items: itemsWithPrice,
            totalAmount,
            userName: user.name || "Customer",
        });

        res.status(201).json({ success: true, message: "Order saved and email sent!", order: newOrder });
    } catch (error) {
        console.error("❌ Error saving order:", error);
        res.status(500).json({ success: false, message: "Failed to save order" });
    }
});

module.exports = router;
