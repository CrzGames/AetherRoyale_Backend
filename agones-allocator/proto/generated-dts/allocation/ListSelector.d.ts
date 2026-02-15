import type { Long } from '@grpc/proto-loader';
/**
 * ListSelector is the filter options for a GameServer based on List available capacity and/or the
 * existence of a value in a List.
 * 0 for MaxAvailable means unlimited maximum. Default for integer fields: 0
 * "" for ContainsValue means ignore field. Default for string field: ""
 */
export interface ListSelector {
    'containsValue'?: (string);
    'minAvailable'?: (number | string | Long);
    'maxAvailable'?: (number | string | Long);
}
/**
 * ListSelector is the filter options for a GameServer based on List available capacity and/or the
 * existence of a value in a List.
 * 0 for MaxAvailable means unlimited maximum. Default for integer fields: 0
 * "" for ContainsValue means ignore field. Default for string field: ""
 */
export interface ListSelector__Output {
    'containsValue': (string);
    'minAvailable': (string);
    'maxAvailable': (string);
}
