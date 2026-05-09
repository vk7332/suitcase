import { useState } from 'react';

export function useCourtMode() {
    const [enabled, setEnabled] = useState(false);

    function toggle() {
        setEnabled(prev => !prev);
    }

    return { enabled, toggle };
}