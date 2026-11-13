const crypto = require("crypto");

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { order_id, payment_id, signature } = req.body;

    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    hmac.update(order_id + "|" + payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
      res.status(200).json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed!" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
