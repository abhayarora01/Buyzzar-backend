// routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router();
router.use(express.json()); // ensure body parsed (safe even if already global)

// debug-keys.js — paste near top of your server startup (index.js) or routes/payment.js
const id = process.env.RAZORPAY_KEY_ID || '';
const secret = process.env.RAZORPAY_KEY_SECRET || '';
const mask = (s) => s ? `${s.slice(0,6)}...${s.slice(-4)}` : 'MISSING';
console.log('[DEBUG] RAZORPAY_KEY_ID:', id ? mask(id) : 'MISSING');
console.log('[DEBUG] RAZORPAY_KEY_SECRET:', secret ? mask(secret) : 'MISSING');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || ''
});

router.post('/create-order', async (req, res) => {
  try {
    console.log('[create-order] body:', JSON.stringify(req.body));
    const { amount, currency = 'INR' } = req.body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount (should be number in paise)' });
    }

    const options = {
      amount: amount,          // must be integer paise
      currency,
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1
    };

    console.log('[create-order] creating order with options:', options);

    const order = await razorpay.orders.create(options);

    console.log('[create-order] success order id:', order && order.id);
    return res.json({ success: true, order });
  } catch (err) {
    // server-side full log
    console.error('[create-order] ERROR stack:', err && err.stack ? err.stack : err);

    // send helpful info to frontend (stack only in development)
    return res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: err && err.message ? err.message : String(err),
      ...(process.env.NODE_ENV === 'development' ? { stack: err && err.stack } : {})
    });
  }
});

module.exports = router;
