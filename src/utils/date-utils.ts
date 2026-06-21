export const addYears = (date: string, years: number) => {
    const d = new Date(date);
    d.setFullYear(d.getFullYear() + years);
    return d.toDateString();
};