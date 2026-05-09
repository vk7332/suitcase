export const generateParaWiseReply = (plaintSections: any[]) => {
    const replySections: any[] = [];

    plaintSections.forEach((section) => {
        const replyContent = section.content.map((para: string, index: number) => {
            return {
                paraNo: index + 1,
                text: generateReplyText(para),
            };
        });

        replySections.push({
            title: section.title,
            replies: replyContent,
        });
    });

    return replySections;
};

const generateReplyText = (para: string) => {
    const p = para.toLowerCase();

    if (p.includes("paid") || p.includes("payment")) {
        return "The contents of this paragraph are admitted to the extent of payment, but other allegations are denied.";
    }

    if (p.includes("agreement")) {
        return "It is admitted that an agreement existed, however the terms are misrepresented.";
    }

    if (p.includes("breach") || p.includes("failed")) {
        return "The alleged breach is specifically denied.";
    }

    return "The contents of this paragraph are denied for want of knowledge.";
};