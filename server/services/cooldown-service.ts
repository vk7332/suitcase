export const checkCooldown = (
    lastActionAt?: number
) => {
    const now = Date.now();

    if (lastActionAt && now - lastActionAt < 8000) {
        return false;
    }

    return true;
};