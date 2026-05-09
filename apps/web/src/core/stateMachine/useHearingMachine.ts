import { useMachine } from '@xstate/react';
import { hearingMachine } from './hearingMachine';

export function useHearingMachine() {
    const [state, send] = useMachine(hearingMachine);

    return {
        state: state.value,
        send,
        isHearing: state.matches('hearing'),
        isOffline: state.matches('offline'),
        isSafe: state.matches('safe')
    };
}