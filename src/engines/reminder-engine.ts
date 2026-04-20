export function getUpcomingHearings(cases: any[]) {
    const today = new Date();

    return cases.filter((c) => {
        if (!c.next_date) return false;

        const nextDate = new Date(c.next_date);
        const diff =
            (nextDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24);

        return diff >= 0 && diff <= 2; // next 2 days
    });
}


