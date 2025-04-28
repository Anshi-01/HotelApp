const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

console.log("Razorpay KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay KEY_SECRET:", process.env.RAZORPAY_SECRET_KEY);

module.exports = instance;
