import type { FeatureSet as _google_protobuf_FeatureSet, FeatureSet__Output as _google_protobuf_FeatureSet__Output } from '../../google/protobuf/FeatureSet';
import type { UninterpretedOption as _google_protobuf_UninterpretedOption, UninterpretedOption__Output as _google_protobuf_UninterpretedOption__Output } from '../../google/protobuf/UninterpretedOption';
import type { Schema as _grpc_gateway_protoc_gen_openapiv2_options_Schema, Schema__Output as _grpc_gateway_protoc_gen_openapiv2_options_Schema__Output } from '../../grpc/gateway/protoc_gen_openapiv2/options/Schema';
export interface MessageOptions {
    'messageSetWireFormat'?: (boolean);
    'noStandardDescriptorAccessor'?: (boolean);
    'deprecated'?: (boolean);
    'mapEntry'?: (boolean);
    /**
     * @deprecated
     */
    'deprecatedLegacyJsonFieldConflicts'?: (boolean);
    'features'?: (_google_protobuf_FeatureSet | null);
    'uninterpretedOption'?: (_google_protobuf_UninterpretedOption)[];
    '.grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema'?: (_grpc_gateway_protoc_gen_openapiv2_options_Schema | null);
}
export interface MessageOptions__Output {
    'messageSetWireFormat': (boolean);
    'noStandardDescriptorAccessor': (boolean);
    'deprecated': (boolean);
    'mapEntry': (boolean);
    /**
     * @deprecated
     */
    'deprecatedLegacyJsonFieldConflicts': (boolean);
    'features': (_google_protobuf_FeatureSet__Output | null);
    'uninterpretedOption': (_google_protobuf_UninterpretedOption__Output)[];
    '.grpc.gateway.protoc_gen_openapiv2.options.openapiv2_schema': (_grpc_gateway_protoc_gen_openapiv2_options_Schema__Output | null);
}
