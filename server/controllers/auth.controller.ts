import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const login = async (req: Request, res: Response) => {
    const { email, role } = req.body;

    // ⚠️ Replace with DB validation
    if (!email || !role) {
        return res.status(400).json({
            error: "Email and role required",
        });
    }

    // TODO: Fetch user from database
    const user = { id: "temp-id", role, tenant_id: "temp-tenant" };

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role,
            tenantId: user.tenant_id, // 🔥 CRITICAL
        },
        JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({ token });
};

export const verify = async (req: Request, res: Response) => {
    res.json({ message: "Token verified" });
};
