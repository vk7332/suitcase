import { detectContradiction } from "./contradiction.service";
import { scoreWeakness } from "./weakness.service";
import { decideStrategy } from "./strategy.service";
import { decideTiming } from "./timing.service";
import { generateObjection } from "./objection.service";
import { generateFollowUp } from "./followup.service";
import { generateCrossExamChain } from "./crossExam.service";
import { calculateWinProbability } from "./winProbability.service";
import { detectJudgeMood } from "./judgeMood.service";
import { calculateConfidence } from "./confidence.service";
import { applySafety } from "./safety.service";
import { checkCooldown } from "./cooldown.service";

export const runCoCounsel = async ({
    text,
    role,
    memory,
}: {
    text: string;
    role: "opponent" | "judge";
    memory: any;
}) => {
    // 🧠 ANALYSIS
    const contradiction = detectContradiction(
        text,
        memory.history,
        memory.facts
    );

    const weakness = scoreWeakness(text);

    const judgeMood =
        role === "judge" ? detectJudgeMood(text) : null;

    // ⚖ STRATEGY
    const strategy = decideStrategy({
        text,
        contradiction,
        role,
    });

    // ⏱ TIMING
    const timing = decideTiming({
        text,
        strategy: strategy.action,
        role,
        lastInterruptAt: memory.lastInterruptAt,
    });

    // 🗣 ACTIONS
    let objection = null;
    let followUp = null;
    let crossExam = null;

    if (strategy.action === "OBJECT" && timing.decision === "INTERRUPT_NOW") {
        objection = await generateObjection(
            text,
            memory.facts,
            contradiction
        );
    }

    if (strategy.action === "CROSS") {
        crossExam = await generateCrossExamChain(
            text,
            memory.facts
        );
    }

    if (objection) {
        followUp = await generateFollowUp(
            text,
            objection,
            memory.facts
        );
    }

    // 📊 WIN
    const win = calculateWinProbability({
        weakness,
        contradiction,
        strategy,
    });

    const confidence = calculateConfidence({
        contradiction,
        weakness,
        timing,
    });

    const cooldownOk = checkCooldown(memory.lastActionAt);

    const safety = applySafety({
        strategy,
        timing,
        confidence,
    });

    // 🚫 BLOCK if unsafe
    if (!cooldownOk || !safety.allowed) {
        return {
            blocked: true,
            reason: !cooldownOk
                ? "Cooldown active"
                : safety.reason,
            confidence,
        };
    }

    // ✅ ALLOW
    memory.lastActionAt = Date.now();

    return {
        contradiction,
        weakness,
        strategy,
        timing,
        objection,
        followUp,
        crossExam,
        win,
        confidence,
        blocked: false,
    };
};
