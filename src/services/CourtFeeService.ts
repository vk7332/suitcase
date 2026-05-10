import { scheduleI_HP as hpSlabs } from "../data/court-fees/hp/scheduleI";
import { scheduleII_HP as hpFixed } from "../data/court-fees/hp/scheduleII";

import { scheduleI_PB as pbSlabs } from "../data/court-fees/punjab/scheduleI";
import { scheduleII_PB as pbFixed } from "../data/court-fees/punjab/scheduleII";

import { scheduleI_HR as hrSlabs } from "../data/court-fees/haryana/scheduleI";
import { scheduleII_HR as hrFixed } from "../data/court-fees/haryana/scheduleII";

import { scheduleI_DL as dlSlabs } from "../data/court-fees/delhi/scheduleI";
import { scheduleII_DL as dlFixed } from "../data/court-fees/delhi/scheduleII";

import { scheduleI_UP as upSlabs } from "../data/court-fees/up/scheduleI";
import { scheduleII_UP as upFixed } from "../data/court-fees/up/scheduleII";

import { scheduleI_RJ as rjSlabs } from "../data/court-fees/rajasthan/scheduleI";
import { scheduleII_RJ as rjFixed } from "../data/court-fees/rajasthan/scheduleII";

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


