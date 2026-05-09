// apps/web/src/modules/hearing/DevPanel.tsx

import {
    simulateNetworkDrop,
    simulateNetworkRestore,
    simulateAIFailure
} from '@/devtools/simulateFailures';
import { useHearingMachine } from '@/core/stateMachine/useHearingMachine';

export default function DevPanel() {
    const { send } = useHearingMachine();

    return (
        <div>
            <button onClick={simulateNetworkDrop}>Offline</button>
            <button onClick={simulateNetworkRestore}>Online</button>
            <button onClick={() => simulateAIFailure(send)}>AI Fail</button>
        </div>
    );
}