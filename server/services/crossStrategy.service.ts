export const generateCrossStrategy = (sections: any[]) => {
    const strategy: any[] = [];

    sections.forEach((section) => {
        section.content.forEach((para: string) => {
            const p = para.toLowerCase();

            let questions: string[] = [];

            // 🔥 CONTRADICTION TRAP
            questions.push(`Is it correct that ${para}?`);

            // 🔥 DOCUMENT TRAP
            if (p.includes("agreement")) {
                questions.push(
                    "Can you produce the original agreement before this Court?"
                );
            }

            // 🔥 PAYMENT TRAP
            if (p.includes("payment") || p.includes("paid")) {
                questions.push(
                    "Do you have documentary proof of payment such as bank statement?"
                );
            }

            // 🔥 DATE TRAP
            if (p.includes("date")) {
                questions.push(
                    "Can you confirm the exact date and supporting record?"
                );
            }

            // 🔥 MEMORY TRAP
            questions.push(
                "Do you have independent recollection or are you relying on documents?"
            );

            strategy.push({
                paragraph: para,
                questions,
            });
        });
    });

    return strategy;
};