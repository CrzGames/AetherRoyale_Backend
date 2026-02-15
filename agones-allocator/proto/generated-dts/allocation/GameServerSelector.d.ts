import type { PlayerSelector as _allocation_PlayerSelector, PlayerSelector__Output as _allocation_PlayerSelector__Output } from '../allocation/PlayerSelector';
import type { CounterSelector as _allocation_CounterSelector, CounterSelector__Output as _allocation_CounterSelector__Output } from '../allocation/CounterSelector';
import type { ListSelector as _allocation_ListSelector, ListSelector__Output as _allocation_ListSelector__Output } from '../allocation/ListSelector';
export declare const _allocation_GameServerSelector_GameServerState: {
    readonly READY: "READY";
    readonly ALLOCATED: "ALLOCATED";
};
export type _allocation_GameServerSelector_GameServerState = 'READY' | 0 | 'ALLOCATED' | 1;
export type _allocation_GameServerSelector_GameServerState__Output = typeof _allocation_GameServerSelector_GameServerState[keyof typeof _allocation_GameServerSelector_GameServerState];
/**
 * GameServerSelector used for finding a GameServer with matching filters.
 */
export interface GameServerSelector {
    /**
     * Labels to match.
     */
    'matchLabels'?: ({
        [key: string]: string;
    });
    'gameServerState'?: (_allocation_GameServerSelector_GameServerState);
    'players'?: (_allocation_PlayerSelector | null);
    'counters'?: ({
        [key: string]: _allocation_CounterSelector;
    });
    'lists'?: ({
        [key: string]: _allocation_ListSelector;
    });
}
/**
 * GameServerSelector used for finding a GameServer with matching filters.
 */
export interface GameServerSelector__Output {
    /**
     * Labels to match.
     */
    'matchLabels': ({
        [key: string]: string;
    });
    'gameServerState': (_allocation_GameServerSelector_GameServerState__Output);
    'players': (_allocation_PlayerSelector__Output | null);
    'counters': ({
        [key: string]: _allocation_CounterSelector__Output;
    });
    'lists': ({
        [key: string]: _allocation_ListSelector__Output;
    });
}
