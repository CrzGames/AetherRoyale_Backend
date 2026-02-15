// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type { Int64Value as _google_protobuf_Int64Value, Int64Value__Output as _google_protobuf_Int64Value__Output } from '../google/protobuf/Int64Value';

export interface _allocation_AllocationResponse_CounterStatus {
  'count'?: (_google_protobuf_Int64Value | null);
  'capacity'?: (_google_protobuf_Int64Value | null);
}

export interface _allocation_AllocationResponse_CounterStatus__Output {
  'count': (_google_protobuf_Int64Value__Output | null);
  'capacity': (_google_protobuf_Int64Value__Output | null);
}

export interface _allocation_AllocationResponse_GameServerMetadata {
  'labels'?: ({[key: string]: string});
  'annotations'?: ({[key: string]: string});
}

export interface _allocation_AllocationResponse_GameServerMetadata__Output {
  'labels': ({[key: string]: string});
  'annotations': ({[key: string]: string});
}

/**
 * A single address; identical to corev1.NodeAddress
 */
export interface _allocation_AllocationResponse_GameServerStatusAddress {
  'type'?: (string);
  'address'?: (string);
}

/**
 * A single address; identical to corev1.NodeAddress
 */
export interface _allocation_AllocationResponse_GameServerStatusAddress__Output {
  'type': (string);
  'address': (string);
}

/**
 * The gameserver port info that is allocated.
 */
export interface _allocation_AllocationResponse_GameServerStatusPort {
  'name'?: (string);
  'port'?: (number);
}

/**
 * The gameserver port info that is allocated.
 */
export interface _allocation_AllocationResponse_GameServerStatusPort__Output {
  'name': (string);
  'port': (number);
}

export interface _allocation_AllocationResponse_ListStatus {
  'values'?: (string)[];
  'capacity'?: (_google_protobuf_Int64Value | null);
}

export interface _allocation_AllocationResponse_ListStatus__Output {
  'values': (string)[];
  'capacity': (_google_protobuf_Int64Value__Output | null);
}

export interface AllocationResponse {
  'gameServerName'?: (string);
  'ports'?: (_allocation_AllocationResponse_GameServerStatusPort)[];
  /**
   * Primary address at which game server can be reached
   */
  'address'?: (string);
  'nodeName'?: (string);
  'source'?: (string);
  'metadata'?: (_allocation_AllocationResponse_GameServerMetadata | null);
  /**
   * All addresses at which game server can be reached; copy of Node.Status.addresses
   */
  'addresses'?: (_allocation_AllocationResponse_GameServerStatusAddress)[];
  /**
   * (Beta, CountsAndLists feature flag) Status of Counters and Lists on allocation.
   */
  'counters'?: ({[key: string]: _allocation_AllocationResponse_CounterStatus});
  'lists'?: ({[key: string]: _allocation_AllocationResponse_ListStatus});
  '_metadata'?: "metadata";
}

export interface AllocationResponse__Output {
  'gameServerName': (string);
  'ports': (_allocation_AllocationResponse_GameServerStatusPort__Output)[];
  /**
   * Primary address at which game server can be reached
   */
  'address': (string);
  'nodeName': (string);
  'source': (string);
  'metadata'?: (_allocation_AllocationResponse_GameServerMetadata__Output | null);
  /**
   * All addresses at which game server can be reached; copy of Node.Status.addresses
   */
  'addresses': (_allocation_AllocationResponse_GameServerStatusAddress__Output)[];
  /**
   * (Beta, CountsAndLists feature flag) Status of Counters and Lists on allocation.
   */
  'counters': ({[key: string]: _allocation_AllocationResponse_CounterStatus__Output});
  'lists': ({[key: string]: _allocation_AllocationResponse_ListStatus__Output});
  '_metadata'?: "metadata";
}
