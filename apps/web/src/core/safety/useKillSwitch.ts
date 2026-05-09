import { useState } from 'react';

export function useKillSwitch() {
    const [killed, setKilled] = useState(false);

    function activate() {
        setKilled(true);

        // Stop audio
        window.dispatchEvent(new Event('STOP_AUDIO'));

        // Clear UI (optional)
        console.clear();
    }

    function reset() {
        setKilled(false);
    }

    return { killed, activate, reset };
}