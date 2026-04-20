// src/data/courtFees/hp/scheduleI.ts

export const scheduleI_HP = {
    type: "progressive",

    slabs: [
        { upto: 5000, rate: 0.05 },        // 5%
        { upto: 10000, rate: 0.04 },       // 4%
        { upto: 50000, rate: 0.03 },       // 3%
        { upto: 100000, rate: 0.02 },      // 2%
        { above: true, rate: 0.01 },       // 1%
    ],

    minimumFee: 20,

    rounding: "nearest_5", // HP often uses rounding rules
};