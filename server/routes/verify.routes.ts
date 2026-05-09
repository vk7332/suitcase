import multer from "multer";
import { generateFileHash } from "../utils/hash.util";

const upload = multer();

router.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const fileBuffer = req.file.buffer;

        const computedHash = generateFileHash(fileBuffer);

        const { data } = await supabaseAdmin
            .from("audit_logs")
            .select("*")
            .eq("hash", computedHash)
            .single();

        if (!data) {
            return res.json({
                status: "❌ TAMPERED / NOT FOUND",
                computedHash,
            });
        }

        return res.json({
            status: "✅ VALID DOCUMENT",
            signedBy: data.user_name,
            createdAt: data.created_at,
            hash: computedHash,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    const { hash } = req.query;

    const { data } = await supabaseAdmin
        .from("audit_logs")
        .select("*")
        .eq("hash", hash)
        .single();

    if (!data) {
        return res.status(404).json({
            status: "INVALID / TAMPERED",
        });
    }

    if (computedHash !== data.final_hash) {
        return res.json({
            status: "❌ TAMPERED",
            expected: data.final_hash,
            got: computedHash,
        });
    }

    return res.json({
        status: "VALID",
        signedBy: data.user_name,
        hash: data.hash,
        createdAt: data.created_at,
        txHash: data.tx_hash,
    });
});