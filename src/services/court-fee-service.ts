import { scheduleI_HP as hpSlabs } from "../data/court-fees/hp/schedule-i";
import { scheduleII_HP as hpFixed } from "../data/court-fees/hp/schedule-ii";

import { scheduleI_PB as pbSlabs } from "../data/court-fees/punjab/schedule-i";
import { scheduleII_PB as pbFixed } from "../data/court-fees/punjab/schedule-ii";

import { scheduleI_HR as hrSlabs } from "../data/court-fees/haryana/schedule-i";
import { scheduleII_HR as hrFixed } from "../data/court-fees/haryana/schedule-ii";

import { scheduleI_DL as dlSlabs } from "../data/court-fees/delhi/schedule-i";
import { scheduleII_DL as dlFixed } from "../data/court-fees/delhi/schedule-ii";

import { scheduleI_UP as upSlabs } from "../data/court-fees/up/schedule-i";
import { scheduleII_UP as upFixed } from "../data/court-fees/up/schedule-ii";

import { scheduleI_RJ as rjSlabs } from "../data/court-fees/rajasthan/schedule-i";
import { scheduleII_RJ as rjFixed } from "../data/court-fees/rajasthan/schedule-ii";

export function getStateFeeRules(state: string) {
    switch (state) {
        case "HP":
            return { slabs: hpSlabs, fixedFees: hpFixed };

        case "PB":
            return { slabs: pbSlabs, fixedFees: pbFixed };

        case "HR":
            return { slabs: hrSlabs, fixedFees: hrFixed };

        case "DL":
            return { slabs: dlSlabs, fixedFees: dlFixed };

        case "UP":
            return { slabs: upSlabs, fixedFees: upFixed };

        case "RJ":
            return { slabs: rjSlabs, fixedFees: rjFixed };

        default:
            return { slabs: hpSlabs, fixedFees: hpFixed };
    }
}


