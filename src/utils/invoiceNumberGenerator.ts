export const generateInvoiceNumber = () => {
    const date = new Date();
    return `INV-${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}-${Math.floor(
        1000 + Math.random() * 9000
    )}`;
};


