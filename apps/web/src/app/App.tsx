import { useEffect } from 'react';
import { useHearingMachine } from '@/core/stateMachine/useHearingMachine';
import HearingUI from '@/modules/hearing/HearingUI';
import { useSyncQueue } from '@/core/offline/useSyncQueue';
import { useKillSwitch } from '@/core/safety/useKillSwitch';
import { useCourtMode } from '@/core/safety/useCourtMode';
import UsageMeter from '@/modules/billing/UsageMeter';
import TrialBanner from '@/modules/billing/TrialBanner';

useSyncQueue();
useKillSwitch();
useCourtMode();

export default function App() {
    const { send } = useHearingMachine();

    useEffect(() => {
        function handleOffline() {
            send({ type: 'NETWORK_LOST' });
        }

        function handleOnline() {
            send({ type: 'NETWORK_RESTORED' });
        }

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [send]);

    return (
        <div>
            <HearingUI />
        </div>
    );
}

export default function App() {
    const { killed, activate } = useKillSwitch();

    // 🔴 HARD OVERRIDE
    if (killed) return <div />;

    return (
        <div>

            {/* 🟥 Kill Switch Button (can hide later) */}
            <button
                onClick={activate}
                style={{
                    position: 'fixed',
                    top: 10,
                    right: 10,
                    zIndex: 9999
                }}
            >
                🟥
            </button>

            <HearingUI />

        </div>
    );
}

export default function App() {
    const { enabled, toggle } = useCourtMode();

    return (
        <div className={enabled ? 'court-mode' : ''}>

            {/* Toggle (you can hide later) */}
            <button
                onClick={toggle}
                style={{ position: 'fixed', bottom: 10, right: 10 }}
            >
                🕶️
            </button>

            <HearingUI />

        </div>
    );
}

function App() {
    return (
        <>
            <TrialBanner />
            <UsageMeter />

            {/* rest of app */}
        </>
    );
}