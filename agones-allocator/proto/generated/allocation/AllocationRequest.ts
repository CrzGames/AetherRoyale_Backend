// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type { MultiClusterSetting as _allocation_MultiClusterSetting, MultiClusterSetting__Output as _allocation_MultiClusterSetting__Output } from '../allocation/MultiClusterSetting';
import type { GameServerSelector as _allocation_GameServerSelector, GameServerSelector__Output as _allocation_GameServerSelector__Output } from '../allocation/GameServerSelector';
import type { MetaPatch as _allocation_MetaPatch, MetaPatch__Output as _allocation_MetaPatch__Output } from '../allocation/MetaPatch';
import type { Priority as _allocation_Priority, Priority__Output as _allocation_Priority__Output } from '../allocation/Priority';
import type { CounterAction as _allocation_CounterAction, CounterAction__Output as _allocation_CounterAction__Output } from '../allocation/CounterAction';
import type { ListAction as _allocation_ListAction, ListAction__Output as _allocation_ListAction__Output } from '../allocation/ListAction';

// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

export const _allocation_AllocationRequest_SchedulingStrategy = {
  Packed: 'Packed',
  Distributed: 'Distributed',
} as const;

export type _allocation_AllocationRequest_SchedulingStrategy =
  | 'Packed'
  | 0
  | 'Distributed'
  | 1

export type _allocation_AllocationRequest_SchedulingStrategy__Output = typeof _allocation_AllocationRequest_SchedulingStrategy[keyof typeof _allocation_AllocationRequest_SchedulingStrategy]

export interface AllocationRequest {
  /**
   * The k8s namespace that is hosting the targeted fleet of gameservers to be allocated
   */
  'namespace'?: (string);
  /**
   * If specified, multi-cluster policies are applied. Otherwise, allocation will happen locally.
   */
  'multiClusterSetting'?: (_allocation_MultiClusterSetting | null);
  /**
   * Deprecated: Please use gameServerSelectors instead. This field is ignored if the
   * gameServerSelectors field is set
   * The required allocation. Defaults to all GameServers.
   * @deprecated
   */
  'requiredGameServerSelector'?: (_allocation_GameServerSelector | null);
  /**
   * Deprecated: Please use gameServerSelectors instead. This field is ignored if the
   * gameServerSelectors field is set
   * The ordered list of preferred allocations out of the `required` set.
   * If the first selector is not matched, the selection attempts the second selector, and so on.
   * @deprecated
   */
  'preferredGameServerSelectors'?: (_allocation_GameServerSelector)[];
  /**
   * Scheduling strategy. Defaults to "Packed".
   */
  'scheduling'?: (_allocation_AllocationRequest_SchedulingStrategy);
  /**
   * Deprecated: Please use metadata instead. This field is ignored if the
   * metadata field is set
   */
  'metaPatch'?: (_allocation_MetaPatch | null);
  /**
   * Metadata is optional custom metadata that is added to the game server at
   * allocation. You can use this to tell the server necessary session data
   */
  'metadata'?: (_allocation_MetaPatch | null);
  /**
   * Ordered list of GameServer label selectors.
   * If the first selector is not matched, the selection attempts the second selector, and so on.
   * This is useful for things like smoke testing of new game servers.
   * Note: This field can only be set if neither Required or Preferred is set.
   */
  'gameServerSelectors'?: (_allocation_GameServerSelector)[];
  /**
   * [Stage: Beta]
   * [FeatureFlag:CountsAndLists]
   * `Priorities` configuration alters the order in which `GameServers` are searched for matches to the configured `selectors`.
   * 
   * Priority of sorting is in descending importance. I.e. The position 0 `priority` entry is checked first.
   * 
   * For `Packed` strategy sorting, this priority list will be the tie-breaker within the least utilised infrastructure, to ensure optimal
   * infrastructure usage while also allowing some custom prioritisation of `GameServers`.
   * 
   * For `Distributed` strategy sorting, the entire selection of `GameServers` will be sorted by this priority list to provide the
   * order that `GameServers` will be allocated by.
   */
  'priorities'?: (_allocation_Priority)[];
  /**
   * [Stage: Beta]
   * [FeatureFlag:CountsAndLists]
   * Counters and Lists provide a set of actions to perform
   * on Counters and Lists during allocation.
   */
  'counters'?: ({[key: string]: _allocation_CounterAction});
  'lists'?: ({[key: string]: _allocation_ListAction});
}

export interface AllocationRequest__Output {
  /**
   * The k8s namespace that is hosting the targeted fleet of gameservers to be allocated
   */
  'namespace': (string);
  /**
   * If specified, multi-cluster policies are applied. Otherwise, allocation will happen locally.
   */
  'multiClusterSetting': (_allocation_MultiClusterSetting__Output | null);
  /**
   * Deprecated: Please use gameServerSelectors instead. This field is ignored if the
   * gameServerSelectors field is set
   * The required allocation. Defaults to all GameServers.
   * @deprecated
   */
  'requiredGameServerSelector': (_allocation_GameServerSelector__Output | null);
  /**
   * Deprecated: Please use gameServerSelectors instead. This field is ignored if the
   * gameServerSelectors field is set
   * The ordered list of preferred allocations out of the `required` set.
   * If the first selector is not matched, the selection attempts the second selector, and so on.
   * @deprecated
   */
  'preferredGameServerSelectors': (_allocation_GameServerSelector__Output)[];
  /**
   * Scheduling strategy. Defaults to "Packed".
   */
  'scheduling': (_allocation_AllocationRequest_SchedulingStrategy__Output);
  /**
   * Deprecated: Please use metadata instead. This field is ignored if the
   * metadata field is set
   */
  'metaPatch': (_allocation_MetaPatch__Output | null);
  /**
   * Metadata is optional custom metadata that is added to the game server at
   * allocation. You can use this to tell the server necessary session data
   */
  'metadata': (_allocation_MetaPatch__Output | null);
  /**
   * Ordered list of GameServer label selectors.
   * If the first selector is not matched, the selection attempts the second selector, and so on.
   * This is useful for things like smoke testing of new game servers.
   * Note: This field can only be set if neither Required or Preferred is set.
   */
  'gameServerSelectors': (_allocation_GameServerSelector__Output)[];
  /**
   * [Stage: Beta]
   * [FeatureFlag:CountsAndLists]
   * `Priorities` configuration alters the order in which `GameServers` are searched for matches to the configured `selectors`.
   * 
   * Priority of sorting is in descending importance. I.e. The position 0 `priority` entry is checked first.
   * 
   * For `Packed` strategy sorting, this priority list will be the tie-breaker within the least utilised infrastructure, to ensure optimal
   * infrastructure usage while also allowing some custom prioritisation of `GameServers`.
   * 
   * For `Distributed` strategy sorting, the entire selection of `GameServers` will be sorted by this priority list to provide the
   * order that `GameServers` will be allocated by.
   */
  'priorities': (_allocation_Priority__Output)[];
  /**
   * [Stage: Beta]
   * [FeatureFlag:CountsAndLists]
   * Counters and Lists provide a set of actions to perform
   * on Counters and Lists during allocation.
   */
  'counters': ({[key: string]: _allocation_CounterAction__Output});
  'lists': ({[key: string]: _allocation_ListAction__Output});
}
