export function simulateNetworkDrop() {
    window.dispatchEvent(new Event('offline'));
}

export function simulateNetworkRestore() {
    window.dispatchEvent(new Event('online'));
}

export function simulateAIFailure(send: any) {
    send({ type: 'AI_FAILURE' });
}

export function simulateAudioFailure() {
    console.error('Simulated mic failure');
}