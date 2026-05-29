// placeholders for now
const dummyScheduleI = {
    calculationType: "flat",
    slabs: [],
    minimumFee: 0,
    rounding: "none",
};

import { scheduleI_HP } from "./hp/schedule-i";
import { scheduleII_HP, additionalCharges_HP } from "./hp/schedule-ii";

import { scheduleII_PB } from "./punjab/schedule-ii";
import { scheduleII_HR } from "./haryana/schedule-ii";
import { scheduleI_DL } from "./delhi/schedule-i";
import { scheduleII_DL } from "./delhi/schedule-ii";
import { scheduleII_UP } from "./up/schedule-ii";
import { scheduleII_RJ } from "./rajasthan/schedule-ii";

const scheduleI_PB = dummyScheduleI;
const scheduleI_HR = dummyScheduleI;
const scheduleI_UP = dummyScheduleI;
const scheduleI_RJ = dummyScheduleI;

export const courtFeeStates = {
    hp: {
        scheduleI: scheduleI_HP,
        scheduleII: scheduleII_HP,
        additional: additionalCharges_HP,
    },
    punjab: {
        scheduleI: scheduleI_PB,
        scheduleII: scheduleII_PB,
    },
    haryana: {
        scheduleI: scheduleI_HR,
        scheduleII: scheduleII_HR,
    },
    delhi: {
        scheduleI: scheduleI_DL,
        scheduleII: scheduleII_DL,
    },
    up: {
        scheduleI: scheduleI_UP,
        scheduleII: scheduleII_UP,
    },
    rajasthan: {
        scheduleI: scheduleI_RJ,
        scheduleII: scheduleII_RJ,
    },
};
