export const calculateGST = (amount: number, rate: number) => {
    const gst = (amount * rate) / 100;
    return {
        gst,
        total: amount + gst,
    };
};


