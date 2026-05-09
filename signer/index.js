const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { init, signHash } = require("./pkcs11");

const app = express();

app.use(cors());
app.use(bodyParser.json());

try {
    init();
    console.log("✅ Token initialized");
} catch (err) {
    console.error("❌ Token error:", err.message);
}

// SIGN API
app.post("/sign", async (req, res) => {
    try {
        const { hash } = req.body;

        if (!hash) {
            return res.status(400).json({ error: "Hash required" });
        }

        const hashBuffer = Buffer.from(hash, "hex");

        const signature = signHash(hashBuffer);

        res.json({ signature });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(1580, () => {
    console.log("🚀 DSC Signer running on http://localhost:1580");
});