export function calculateLimitation(
    startDate: string,
    days: number
) {
    const start = new Date(startDate);
    const lastDate = new Date(start);
    lastDate.setDate(start.getDate() + days);

    return lastDate;
}

export function getDaysRemaining(lastDate: string) {
    const today = new Date();
    const last = new Date(lastDate);

    const diff = last.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getStatus(daysRemaining: number, alertDays: number) {
    if (daysRemaining < 0) return "expired";
    if (daysRemaining <= alertDays) return "warning";
    return "safe";
}
