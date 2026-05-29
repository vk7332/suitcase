export const useHaptics = () => {
    const vibrate = (pattern: number | number[] = 50) => {
        // 📱 Only works on supported mobile browsers
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    };

    return { vibrate };
};
