// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type { Long } from '@grpc/proto-loader';

/**
 * PlayerSelector is filter for player capacity values.
 * minAvailable should always be less or equal to maxAvailable.
 */
export interface PlayerSelector {
  'minAvailable'?: (number | string | Long);
  'maxAvailable'?: (number | string | Long);
}

/**
 * PlayerSelector is filter for player capacity values.
 * minAvailable should always be less or equal to maxAvailable.
 */
export interface PlayerSelector__Output {
  'minAvailable': (string);
  'maxAvailable': (string);
}
