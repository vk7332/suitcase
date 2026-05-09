const KEY = 'offline_queue';

export function addToQueue(item: any) {
    const queue = JSON.parse(localStorage.getItem(KEY) || '[]');
    queue.push(item);
    localStorage.setItem(KEY, JSON.stringify(queue));
}

export function getQueue() {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
}

export function clearQueue() {
    localStorage.removeItem(KEY);
}