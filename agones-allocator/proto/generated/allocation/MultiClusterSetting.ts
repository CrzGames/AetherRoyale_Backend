// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type { LabelSelector as _allocation_LabelSelector, LabelSelector__Output as _allocation_LabelSelector__Output } from '../allocation/LabelSelector';

/**
 * Specifies settings for multi-cluster allocation.
 */
export interface MultiClusterSetting {
  /**
   * If set to true, multi-cluster allocation is enabled.
   */
  'enabled'?: (boolean);
  /**
   * Selects multi-cluster allocation policies to apply. If not specified, all multi-cluster allocation policies are to be applied.
   */
  'policySelector'?: (_allocation_LabelSelector | null);
}

/**
 * Specifies settings for multi-cluster allocation.
 */
export interface MultiClusterSetting__Output {
  /**
   * If set to true, multi-cluster allocation is enabled.
   */
  'enabled': (boolean);
  /**
   * Selects multi-cluster allocation policies to apply. If not specified, all multi-cluster allocation policies are to be applied.
   */
  'policySelector': (_allocation_LabelSelector__Output | null);
}
