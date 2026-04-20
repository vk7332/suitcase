import { scheduleI_HP } from "./hp/scheduleI";
import { scheduleII_HP, additionalCharges_HP } from "./hp/scheduleII";

// placeholders for now
import { scheduleI_PB, scheduleII_PB } from "./punjab/scheduleII";
import { scheduleI_HR, scheduleII_HR } from "./haryana/scheduleII";
import { scheduleI_DL, scheduleII_DL } from "./delhi/scheduleII";
import { scheduleI_UP, scheduleII_UP } from "./up/scheduleII";
import { scheduleI_RJ, scheduleII_RJ } from "./rajasthan/scheduleII";

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