/**
 * Convert Plaint → Written Statement (FULL VERSION)
 */

interface Section {
    title: string;
    content: string[];
}

export const convertToWrittenStatement = (sections: Section[]) => {
    const preliminary: Section = {
        title: "PRELIMINARY OBJECTIONS",
        content: [
            "That the present suit is not maintainable.",
            "That the Plaintiff has suppressed material facts.",
            "That the suit is barred by law and liable to be dismissed.",
        ],
    };

    const replySections: Section[] = sections.map((section) => {
        return {
            title: section.title,
            content: section.content.map((para, index) =>
                generateReplyPara(para, index)
            ),
        };
    });

    const prayer: Section = {
        title: "PRAYER",
        content: [
            "It is therefore prayed that the present suit be dismissed with costs.",
        ],
    };

    return [preliminary, ...replySections, prayer];
};

// 🔍 SMART PARA RESPONSE ENGINE
const generateReplyPara = (para: string, index: number) => {
    const p = para.toLowerCase();

    if (p.includes("payment") || p.includes("paid")) {
        return `Para ${index + 1}: It is admitted that payment was made, however the purpose is misrepresented.`;
    }

    if (p.includes("agreement")) {
        return `Para ${index + 1}: It is admitted that an agreement existed, but the terms are denied.`;
    }

    if (p.includes("breach") || p.includes("failed")) {
        return `Para ${index + 1}: The alleged breach is specifically denied.`;
    }

    if (p.includes("date")) {
        return `Para ${index + 1}: The contents regarding date are a matter of record.`;
    }

    return `Para ${index + 1}: The contents of this paragraph are denied for want of knowledge.`;
};

// 🔁 OPTIONAL: Convert → Rejoinder
export const convertToRejoinder = (sections: Section[]) => {
    return sections.map((section) => ({
        title: section.title,
        content: section.content.map((para, i) =>
            `Para ${i + 1}: The contents are denied and original plaint is reaffirmed.`
        ),
    }));
};