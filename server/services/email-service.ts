import nodemailer from "nodemailer";

export const generateInvoiceNumber = () => {
    const date = new Date();
    return `INV-${date.getFullYear()}${date.getMonth() + 1}-${Date.now()}`;
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
    await transporter.sendMail({
        from: `"VK Tax & Law Chamber" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });
};

export const sendSMS = async (to: string, message: string) => {
    // Implement SMS sending logic using a service like Twilio  
    console.log(`Sending SMS to ${to}: ${message}`);
};

export const sendInvoiceEmail = async (
    to: string,
    invoiceUrl: string
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"VK Tax & Law Chamber" <${process.env.EMAIL_USER}>`,
        to,
        subject: "Your Invoice",
        html: `
      <p>Your invoice is ready.</p>
      <a href="${invoiceUrl}">Download Invoice</a>
    `,
    });
};