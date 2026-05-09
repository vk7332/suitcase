export const requireRole = (roles: string[]) => {
    return async (req, res, next) => {
        const user = req.user; // from auth middleware

        if (!roles.includes(user.role)) {
            return res.status(403).json({ error: "forbidden" });
        }

        next();
    };
};