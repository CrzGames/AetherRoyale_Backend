// Original file: null

import type { FeatureSet as _google_protobuf_FeatureSet, FeatureSet__Output as _google_protobuf_FeatureSet__Output } from '../../google/protobuf/FeatureSet';
import type { UninterpretedOption as _google_protobuf_UninterpretedOption, UninterpretedOption__Output as _google_protobuf_UninterpretedOption__Output } from '../../google/protobuf/UninterpretedOption';
import type { Operation as _grpc_gateway_protoc_gen_openapiv2_options_Operation, Operation__Output as _grpc_gateway_protoc_gen_openapiv2_options_Operation__Output } from '../../grpc/gateway/protoc_gen_openapiv2/options/Operation';
import type { HttpRule as _google_api_HttpRule, HttpRule__Output as _google_api_HttpRule__Output } from '../../google/api/HttpRule';

// Original file: null

export const _google_protobuf_MethodOptions_IdempotencyLevel = {
  IDEMPOTENCY_UNKNOWN: 'IDEMPOTENCY_UNKNOWN',
  NO_SIDE_EFFECTS: 'NO_SIDE_EFFECTS',
  IDEMPOTENT: 'IDEMPOTENT',
} as const;

export type _google_protobuf_MethodOptions_IdempotencyLevel =
  | 'IDEMPOTENCY_UNKNOWN'
  | 0
  | 'NO_SIDE_EFFECTS'
  | 1
  | 'IDEMPOTENT'
  | 2

export type _google_protobuf_MethodOptions_IdempotencyLevel__Output = typeof _google_protobuf_MethodOptions_IdempotencyLevel[keyof typeof _google_protobuf_MethodOptions_IdempotencyLevel]

export interface MethodOptions {
  'deprecated'?: (boolean);
  'idempotencyLevel'?: (_google_protobuf_MethodOptions_IdempotencyLevel);
  'features'?: (_google_protobuf_FeatureSet | null);
  'uninterpretedOption'?: (_google_protobuf_UninterpretedOption)[];
  '.grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation'?: (_grpc_gateway_protoc_gen_openapiv2_options_Operation | null);
  '.google.api.http'?: (_google_api_HttpRule | null);
}

export interface MethodOptions__Output {
  'deprecated': (boolean);
  'idempotencyLevel': (_google_protobuf_MethodOptions_IdempotencyLevel__Output);
  'features': (_google_protobuf_FeatureSet__Output | null);
  'uninterpretedOption': (_google_protobuf_UninterpretedOption__Output)[];
  '.grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation': (_grpc_gateway_protoc_gen_openapiv2_options_Operation__Output | null);
  '.google.api.http': (_google_api_HttpRule__Output | null);
}
