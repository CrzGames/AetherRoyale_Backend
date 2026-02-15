// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto


// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

export const _allocation_Priority_Order = {
  Ascending: 'Ascending',
  Descending: 'Descending',
} as const;

export type _allocation_Priority_Order =
  | 'Ascending'
  | 0
  | 'Descending'
  | 1

export type _allocation_Priority_Order__Output = typeof _allocation_Priority_Order[keyof typeof _allocation_Priority_Order]

// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

export const _allocation_Priority_Type = {
  Counter: 'Counter',
  List: 'List',
} as const;

export type _allocation_Priority_Type =
  | 'Counter'
  | 0
  | 'List'
  | 1

export type _allocation_Priority_Type__Output = typeof _allocation_Priority_Type[keyof typeof _allocation_Priority_Type]

/**
 * Priority is a sorting option for GameServers with Counters or Lists based on the Capacity.
 * Type: Sort by a "Counter" or a "List".
 * Key: The name of the Counter or List. If not found on the GameServer, has no impact.
 * Order: Sort by "Ascending" or "Descending". "Descending" a bigger Capacity is preferred.
 * "Ascending" would be smaller Capacity is preferred.
 */
export interface Priority {
  'type'?: (_allocation_Priority_Type);
  'key'?: (string);
  'order'?: (_allocation_Priority_Order);
}

/**
 * Priority is a sorting option for GameServers with Counters or Lists based on the Capacity.
 * Type: Sort by a "Counter" or a "List".
 * Key: The name of the Counter or List. If not found on the GameServer, has no impact.
 * Order: Sort by "Ascending" or "Descending". "Descending" a bigger Capacity is preferred.
 * "Ascending" would be smaller Capacity is preferred.
 */
export interface Priority__Output {
  'type': (_allocation_Priority_Type__Output);
  'key': (string);
  'order': (_allocation_Priority_Order__Output);
}
