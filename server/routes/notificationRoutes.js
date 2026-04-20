const express = require("express");
const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { email, message } = req.body;

    console.log("Email sent to:", email, message);

    res.json({ success: true });
});

router.post("/send-whatsapp", async (req, res) => {
    const { phone, message } = req.body;

    console.log("WhatsApp to:", phone, message);

    res.json({ success: true });
});

module.exports = router;