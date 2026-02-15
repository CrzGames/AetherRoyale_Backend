// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type { StringValue as _google_protobuf_StringValue, StringValue__Output as _google_protobuf_StringValue__Output } from '../google/protobuf/StringValue';
import type { Int64Value as _google_protobuf_Int64Value, Int64Value__Output as _google_protobuf_Int64Value__Output } from '../google/protobuf/Int64Value';

/**
 * CounterAction is an optional action that can be performed on a Counter at allocation.
 * Action: "Increment" or "Decrement" the Counter's Count (optional). Must also define the Amount.
 * Amount: The amount to increment or decrement the Count (optional). Must be a positive integer.
 * Capacity: Update the maximum capacity of the Counter to this number (optional). Min 0, Max int64.
 */
export interface CounterAction {
  'action'?: (_google_protobuf_StringValue | null);
  'amount'?: (_google_protobuf_Int64Value | null);
  'capacity'?: (_google_protobuf_Int64Value | null);
}

/**
 * CounterAction is an optional action that can be performed on a Counter at allocation.
 * Action: "Increment" or "Decrement" the Counter's Count (optional). Must also define the Amount.
 * Amount: The amount to increment or decrement the Count (optional). Must be a positive integer.
 * Capacity: Update the maximum capacity of the Counter to this number (optional). Min 0, Max int64.
 */
export interface CounterAction__Output {
  'action': (_google_protobuf_StringValue__Output | null);
  'amount': (_google_protobuf_Int64Value__Output | null);
  'capacity': (_google_protobuf_Int64Value__Output | null);
}
