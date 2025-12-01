require('dotenv').config();
const axios = require('axios');

const QIKINK_CLIENT_ID = process.env.QIKINK_CLIENT_ID;
const QIKINK_CLIENT_SECRET = process.env.QIKINK_CLIENT_SECRET;

// Automatically use sandbox or live URL based on NODE_ENV
const QIKINK_ORDER_URL = process.env.NODE_ENV === 'production'
  ? process.env.QIKINK_ORDER_URL_LIVE
  : process.env.QIKINK_ORDER_URL_SANDBOX;

const createQikinkOrder = async (orderPayload) => {
  try {
    const response = await axios.post(QIKINK_ORDER_URL, orderPayload, {
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': QIKINK_CLIENT_ID,
        'Client-Secret': QIKINK_CLIENT_SECRET,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Qikink API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to send order to Qikink');
  }
};

module.exports = { createQikinkOrder };
