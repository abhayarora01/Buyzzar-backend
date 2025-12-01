// utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendOrderConfirmationEmail = async (toEmail, { items, totalAmount, userName }) => {
  try {
    // Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use "hotmail", "yahoo", etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Format order items
    const itemList = items.map((item, index) => {
      return `
        <tr>
          <td>${index + 1}</td>
          <td>${item.productId.productName}</td>
          <td>${item.quantity}</td>
          <td>₹${item.productId.sellingPrice}</td>
          <td>₹${item.productId.sellingPrice * item.quantity}</td>
        </tr>`;
    }).join("");

    // Email content
    const htmlContent = `
      <h2>Hello ${userName},</h2>
      <p>Thank you for your purchase! Here is your order summary:</p>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemList}</tbody>
      </table>
      <h3>Total Paid: ₹${totalAmount}</h3>
      <p>We hope to serve you again soon!</p>
      <p>Apna Attire Team</p>
    `;

    // Send mail
    await transporter.sendMail({
      from: `"Apna Attire" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "🧾 Your Order Confirmation - Apna Attire",
      html: htmlContent,
    });

    console.log("✅ Confirmation email sent to:", toEmail);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
  }
};

module.exports = { sendOrderConfirmationEmail };
