import { createMachine, assign } from 'xstate';

interface Context {
    aiFailures: number;
    networkOnline: boolean;
}

type Event =
    | { type: 'START_HEARING' }
    | { type: 'NETWORK_LOST' }
    | { type: 'NETWORK_RESTORED' }
    | { type: 'AI_FAILURE' }
    | { type: 'AI_SUCCESS' }
    | { type: 'ENTER_SAFE_MODE' }
    | { type: 'EXIT_SAFE_MODE' }
    | { type: 'END_HEARING' };

export const hearingMachine = createMachine<Context, Event>({
    id: 'hearing',
    initial: 'idle',
    context: {
        aiFailures: 0,
        networkOnline: true
    },

    states: {
        idle: {
            on: {
                START_HEARING: 'hearing'
            }
        },

        hearing: {
            on: {
                NETWORK_LOST: 'offline',
                AI_FAILURE: {
                    actions: assign({
                        aiFailures: (ctx) => ctx.aiFailures + 1
                    }),
                    target: 'checkSafeMode'
                },
                END_HEARING: 'idle'
            }
        },

        offline: {
            on: {
                NETWORK_RESTORED: 'hearing',
                ENTER_SAFE_MODE: 'safe'
            }
        },

        safe: {
            entry: 'resetFailures',
            on: {
                EXIT_SAFE_MODE: 'hearing',
                END_HEARING: 'idle'
            }
        },

        checkSafeMode: {
            always: [
                {
                    target: 'safe',
                    cond: (ctx) => ctx.aiFailures >= 3
                },
                {
                    target: 'hearing'
                }
            ]
        }
    }
},
    {
        actions: {
            resetFailures: assign({
                aiFailures: (_) => 0
            })
        }
    });