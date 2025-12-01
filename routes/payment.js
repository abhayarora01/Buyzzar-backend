const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

router.post("/verify", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log("Received razorpay_order_id:", razorpay_order_id);
        console.log("Received razorpay_payment_id:", razorpay_payment_id);
        console.log("Received razorpay_signature:", razorpay_signature);
        console.log("Using secret:", process.env.RAZORPAY_KEY_SECRET);
        // 🔥 Step 1: Verify Signature
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generated_signature = hmac.digest("hex");

        
        console.log("Generated signature:", generated_signature);
        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ 
                success: false, 
                message: "Payment verification failed. Please try again!" 
            });
        }

        // 🔥 Step 2: Payment Verified Successfully
        console.log("✅ Payment Verified Successfully:", req.body);

        // 🔥 Step 3: Send Success Response
        res.json({ success: true, message: "Payment verified successfully!" });
    } catch (error) {
        console.error("🚨 Payment Verification Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Payment verification failed due to a server issue. Try again later!" 
        });
    }
});

module.exports = router;
