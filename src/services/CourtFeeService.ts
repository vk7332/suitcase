import hpSlabs from "../data/court-fees/HP/slabs.json";
import hpFixed from "../data/court-fees/HP/fixedFees.json";

import pbSlabs from "../data/court-fees/Punjab/slabs.json";
import pbFixed from "../data/court-fees/Punjab/fixedFees.json";

import hrSlabs from "../data/court-fees/Haryana/slabs.json";
import hrFixed from "../data/court-fees/Haryana/fixedFees.json";

import dlSlabs from "../data/court-fees/Delhi/slabs.json";
import dlFixed from "../data/court-fees/Delhi/fixedFees.json";

import upSlabs from "../data/court-fees/UP/slabs.json";
import upFixed from "../data/court-fees/UP/fixedFees.json";

import rjSlabs from "../data/court-fees/Rajasthan/slabs.json";
import rjFixed from "../data/court-fees/Rajasthan/fixedFees.json";

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


