// Original file: null

import type { FeatureSet as _google_protobuf_FeatureSet, FeatureSet__Output as _google_protobuf_FeatureSet__Output } from '../../google/protobuf/FeatureSet';
import type { UninterpretedOption as _google_protobuf_UninterpretedOption, UninterpretedOption__Output as _google_protobuf_UninterpretedOption__Output } from '../../google/protobuf/UninterpretedOption';
import type { Tag as _grpc_gateway_protoc_gen_openapiv2_options_Tag, Tag__Output as _grpc_gateway_protoc_gen_openapiv2_options_Tag__Output } from '../../grpc/gateway/protoc_gen_openapiv2/options/Tag';

export interface ServiceOptions {
  'deprecated'?: (boolean);
  'features'?: (_google_protobuf_FeatureSet | null);
  'uninterpretedOption'?: (_google_protobuf_UninterpretedOption)[];
  '.grpc.gateway.protoc_gen_openapiv2.options.openapiv2_tag'?: (_grpc_gateway_protoc_gen_openapiv2_options_Tag | null);
}

export interface ServiceOptions__Output {
  'deprecated': (boolean);
  'features': (_google_protobuf_FeatureSet__Output | null);
  'uninterpretedOption': (_google_protobuf_UninterpretedOption__Output)[];
  '.grpc.gateway.protoc_gen_openapiv2.options.openapiv2_tag': (_grpc_gateway_protoc_gen_openapiv2_options_Tag__Output | null);
}
