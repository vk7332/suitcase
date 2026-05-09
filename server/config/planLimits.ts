// server/config/planLimits.ts

export type PlanType = "free" | "pro" | "enterprise";

type PlanLimits = {
    cases: number;
    members: number;
    storageMb: number;
};

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
    free: {
        cases: 5,
        members: 2,
        storageMb: 100,
    },

    pro: {
        cases: 100,
        members: 10,
        storageMb: 1024,
    },

    enterprise: {
        cases: 1000,
        members: 50,
        storageMb: 10240,
    },
};