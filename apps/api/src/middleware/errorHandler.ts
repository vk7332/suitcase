import { Request, Response, NextFunction } from 'express';

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('❌ API Error:', err);

    /**
     * 🔒 Avoid exposing internals
     */
    const message =
        process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message;

    res.status(err.status || 500).json({
        success: false,
        error: message
    });
}