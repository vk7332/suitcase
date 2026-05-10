export const scheduleI_DL = {
    calculationType: "flat",

    slabs: [
        { upto: 5000, fee: 100 },
        { upto: 10000, fee: 200 },
        { upto: 50000, fee: 500 },
        { above: true, fee: 1000 },
    ],

    minimumFee: 0,
    rounding: "none",
};
