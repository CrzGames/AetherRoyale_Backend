// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type { Long } from '@grpc/proto-loader';

/**
 * CounterSelector is the filter options for a GameServer based on the count and/or available capacity.
 * 0 for MaxCount or MaxAvailable means unlimited maximum. Default for all fields: 0
 */
export interface CounterSelector {
  'minCount'?: (number | string | Long);
  'maxCount'?: (number | string | Long);
  'minAvailable'?: (number | string | Long);
  'maxAvailable'?: (number | string | Long);
}

/**
 * CounterSelector is the filter options for a GameServer based on the count and/or available capacity.
 * 0 for MaxCount or MaxAvailable means unlimited maximum. Default for all fields: 0
 */
export interface CounterSelector__Output {
  'minCount': (string);
  'maxCount': (string);
  'minAvailable': (string);
  'maxAvailable': (string);
}
