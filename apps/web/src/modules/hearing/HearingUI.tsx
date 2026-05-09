import { useHearingMachine } from '@/core/stateMachine/useHearingMachine';
import { useUpgradeSuggestion } from '@/modules/billing/useUpgradeSuggestion';
import UpgradeNudge from '@/modules/billing/UpgradeNudge';

export default function HearingUI() {
    const { state, isOffline, isSafe, send } = useHearingMachine();
    const suggestion = useUpgradeSuggestion();
    const balance = useLiveCredits();

    {
        suggestion?.show && (
            <UpgradeNudge message={suggestion.message} />
        )
    }
    return (
        <div>

            {/* 🟡 OFFLINE MODE */}
            {isOffline && (
                <div style={{ background: 'orange', padding: 8 }}>
                    📡 Offline Mode — working with saved data
                </div>
            )}

            {/* 🔴 SAFE MODE */}
            {isSafe && (
                <div style={{ background: 'red', color: 'white', padding: 8 }}>
                    ⚠️ Safe Mode — core tools only
                </div>
            )}

            {/* 🟢 HEARING MODE */}
            {state === 'hearing' && (
                <div>
                    <button onClick={() => send({ type: 'END_HEARING' })}>
                        End Hearing
                    </button>
                </div>
            )}

            {/* IDLE */}
            {state === 'idle' && (
                <button onClick={() => send({ type: 'START_HEARING' })}>
                    Start Hearing
                </button>
            )}

            <div className="hearing-container">

                {/* TOP BAR (very subtle) */}
                <div className="top-bar non-essential">
                    <span>Hearing Mode</span>
                </div>

                {/* MAIN AREA */}
                <div className="main-area">

                    {/* LEFT: Notes */}
                    <div className="notes-panel">
                        <textarea
                            placeholder="Write notes..."
                            className="notes-input"
                        />
                    </div>

                    {/* RIGHT: AI Suggestions */}
                    <div className="suggestions-panel">
                        <div className="suggestion">
                            Objection: Leading question
                        </div>

                        <div className="suggestion">
                            Ask witness to clarify timeline
                        </div>
                    </div>

                </div>

                {/* BOTTOM: Controls */}
                <div className="bottom-bar">
                    <button>🎤</button>
                    <button>⚖️</button>
                    <button>📄</button>
                </div>

                <div>Credits: {balance}</div>
                {
                    !isSafe && !isOffline && suggestion?.show && (
                        <UpgradeNudge message={suggestion.message} />
                    )
                }

                {isEnterprise && <EnterpriseNudge />}
            </div>
        </div>
    );
}
