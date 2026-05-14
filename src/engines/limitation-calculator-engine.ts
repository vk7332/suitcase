import { LIMITATION_DATA, LimitationEntry } from "../data/limitation-periods";

export class LimitationCalculatorEngine {
    static calculate(startDate: string, entry: LimitationEntry) {
        if (!startDate || entry.unit === 'none') return null;

        const date = new Date(startDate);
        
        switch (entry.unit) {
            case 'days':
                date.setDate(date.getDate() + entry.value);
                break;
            case 'months':
                date.setMonth(date.getMonth() + entry.value);
                break;
            case 'years':
                date.setFullYear(date.getFullYear() + entry.value);
                break;
        }

        const today = new Date();
        const diffTime = date.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return {
            deadline: date,
            deadlineStr: date.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }),
            daysLeft: diffDays,
            isExpired: diffDays < 0,
            isNearExpiry: diffDays >= 0 && diffDays <= 30
        };
    }

    static getEntriesByCategory(category: string) {
        return LIMITATION_DATA.filter(item => item.category === category);
    }
}


