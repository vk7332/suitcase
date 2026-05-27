import { sendWhatsAppAPI } from "../services/whats-app-service";

export async function runAutoReminders(cases: any[], clients: any[]) {
    const today = new Date();

    for (const c of cases) {
        if (!c.next_date || !c.client_id) continue;

        const nextDate = new Date(c.next_date);

        const diff =
            (nextDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24);

        // 📅 1 DAY BEFORE
        if (diff > 0 && diff <= 1) {
            const client = clients.find(
                (cl) => cl.id === c.client_id
            );

            if (!client?.phone) continue;

            const message = `⚖️ Reminder:
Case: ${c.title}
Next Date: ${new Date(c.next_date).toLocaleDateString()}`;

            await sendWhatsAppAPI({
                to: client.phone,
                message,
            });
        }
    }
}


