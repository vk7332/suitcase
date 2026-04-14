import QRCode from "qrcode";

/**
 * Generates a QR Code as a Base64 image.
 * @param url - The URL to encode in the QR code.
 * @returns Base64 string of the QR code image.
 */
export const generateQRCode = async (url: string): Promise<string> => {
    try {
        return await QRCode.toDataURL(url, {
            width: 150,
            margin: 2,
            color: {
                dark: "#000000",
                light: "#FFFFFF",
            },
        });
    } catch (error) {
        console.error("Error generating QR Code:", error);
        throw error;
    }
};
