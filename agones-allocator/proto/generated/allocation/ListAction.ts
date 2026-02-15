// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type { Int64Value as _google_protobuf_Int64Value, Int64Value__Output as _google_protobuf_Int64Value__Output } from '../google/protobuf/Int64Value';

/**
 * ListAction is an optional action that can be performed on a List at allocation.
 * AddValues: Append values to a List's Values array (optional). Any duplicate values will be ignored.
 * Capacity: Update the maximum capacity of the Counter to this number (optional). Min 0, Max 1000.
 * DeleteValues: Remove values from a List's Values array (optional). Any nonexistant values will be ignored.
 */
export interface ListAction {
  'addValues'?: (string)[];
  'capacity'?: (_google_protobuf_Int64Value | null);
  'deleteValues'?: (string)[];
}

/**
 * ListAction is an optional action that can be performed on a List at allocation.
 * AddValues: Append values to a List's Values array (optional). Any duplicate values will be ignored.
 * Capacity: Update the maximum capacity of the Counter to this number (optional). Min 0, Max 1000.
 * DeleteValues: Remove values from a List's Values array (optional). Any nonexistant values will be ignored.
 */
export interface ListAction__Output {
  'addValues': (string)[];
  'capacity': (_google_protobuf_Int64Value__Output | null);
  'deleteValues': (string)[];
}
