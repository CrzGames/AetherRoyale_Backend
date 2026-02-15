import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { AllocationRequest as _allocation_AllocationRequest, AllocationRequest__Output as _allocation_AllocationRequest__Output } from './allocation/AllocationRequest';
import type { AllocationResponse as _allocation_AllocationResponse, AllocationResponse__Output as _allocation_AllocationResponse__Output } from './allocation/AllocationResponse';
import type { AllocationServiceClient as _allocation_AllocationServiceClient, AllocationServiceDefinition as _allocation_AllocationServiceDefinition } from './allocation/AllocationService';
import type { CounterAction as _allocation_CounterAction, CounterAction__Output as _allocation_CounterAction__Output } from './allocation/CounterAction';
import type { CounterSelector as _allocation_CounterSelector, CounterSelector__Output as _allocation_CounterSelector__Output } from './allocation/CounterSelector';
import type { GameServerSelector as _allocation_GameServerSelector, GameServerSelector__Output as _allocation_GameServerSelector__Output } from './allocation/GameServerSelector';
import type { LabelSelector as _allocation_LabelSelector, LabelSelector__Output as _allocation_LabelSelector__Output } from './allocation/LabelSelector';
import type { ListAction as _allocation_ListAction, ListAction__Output as _allocation_ListAction__Output } from './allocation/ListAction';
import type { ListSelector as _allocation_ListSelector, ListSelector__Output as _allocation_ListSelector__Output } from './allocation/ListSelector';
import type { MetaPatch as _allocation_MetaPatch, MetaPatch__Output as _allocation_MetaPatch__Output } from './allocation/MetaPatch';
import type { MultiClusterSetting as _allocation_MultiClusterSetting, MultiClusterSetting__Output as _allocation_MultiClusterSetting__Output } from './allocation/MultiClusterSetting';
import type { PlayerSelector as _allocation_PlayerSelector, PlayerSelector__Output as _allocation_PlayerSelector__Output } from './allocation/PlayerSelector';
import type { Priority as _allocation_Priority, Priority__Output as _allocation_Priority__Output } from './allocation/Priority';
import type { CustomHttpPattern as _google_api_CustomHttpPattern, CustomHttpPattern__Output as _google_api_CustomHttpPattern__Output } from './google/api/CustomHttpPattern';
import type { Http as _google_api_Http, Http__Output as _google_api_Http__Output } from './google/api/Http';
import type { HttpRule as _google_api_HttpRule, HttpRule__Output as _google_api_HttpRule__Output } from './google/api/HttpRule';
import type { BoolValue as _google_protobuf_BoolValue, BoolValue__Output as _google_protobuf_BoolValue__Output } from './google/protobuf/BoolValue';
import type { BytesValue as _google_protobuf_BytesValue, BytesValue__Output as _google_protobuf_BytesValue__Output } from './google/protobuf/BytesValue';
import type { DescriptorProto as _google_protobuf_DescriptorProto, DescriptorProto__Output as _google_protobuf_DescriptorProto__Output } from './google/protobuf/DescriptorProto';
import type { DoubleValue as _google_protobuf_DoubleValue, DoubleValue__Output as _google_protobuf_DoubleValue__Output } from './google/protobuf/DoubleValue';
import type { EnumDescriptorProto as _google_protobuf_EnumDescriptorProto, EnumDescriptorProto__Output as _google_protobuf_EnumDescriptorProto__Output } from './google/protobuf/EnumDescriptorProto';
import type { EnumOptions as _google_protobuf_EnumOptions, EnumOptions__Output as _google_protobuf_EnumOptions__Output } from './google/protobuf/EnumOptions';
import type { EnumValueDescriptorProto as _google_protobuf_EnumValueDescriptorProto, EnumValueDescriptorProto__Output as _google_protobuf_EnumValueDescriptorProto__Output } from './google/protobuf/EnumValueDescriptorProto';
import type { EnumValueOptions as _google_protobuf_EnumValueOptions, EnumValueOptions__Output as _google_protobuf_EnumValueOptions__Output } from './google/protobuf/EnumValueOptions';
import type { ExtensionRangeOptions as _google_protobuf_ExtensionRangeOptions, ExtensionRangeOptions__Output as _google_protobuf_ExtensionRangeOptions__Output } from './google/protobuf/ExtensionRangeOptions';
import type { FeatureSet as _google_protobuf_FeatureSet, FeatureSet__Output as _google_protobuf_FeatureSet__Output } from './google/protobuf/FeatureSet';
import type { FeatureSetDefaults as _google_protobuf_FeatureSetDefaults, FeatureSetDefaults__Output as _google_protobuf_FeatureSetDefaults__Output } from './google/protobuf/FeatureSetDefaults';
import type { FieldDescriptorProto as _google_protobuf_FieldDescriptorProto, FieldDescriptorProto__Output as _google_protobuf_FieldDescriptorProto__Output } from './google/protobuf/FieldDescriptorProto';
import type { FieldOptions as _google_protobuf_FieldOptions, FieldOptions__Output as _google_protobuf_FieldOptions__Output } from './google/protobuf/FieldOptions';
import type { FileDescriptorProto as _google_protobuf_FileDescriptorProto, FileDescriptorProto__Output as _google_protobuf_FileDescriptorProto__Output } from './google/protobuf/FileDescriptorProto';
import type { FileDescriptorSet as _google_protobuf_FileDescriptorSet, FileDescriptorSet__Output as _google_protobuf_FileDescriptorSet__Output } from './google/protobuf/FileDescriptorSet';
import type { FileOptions as _google_protobuf_FileOptions, FileOptions__Output as _google_protobuf_FileOptions__Output } from './google/protobuf/FileOptions';
import type { FloatValue as _google_protobuf_FloatValue, FloatValue__Output as _google_protobuf_FloatValue__Output } from './google/protobuf/FloatValue';
import type { GeneratedCodeInfo as _google_protobuf_GeneratedCodeInfo, GeneratedCodeInfo__Output as _google_protobuf_GeneratedCodeInfo__Output } from './google/protobuf/GeneratedCodeInfo';
import type { Int32Value as _google_protobuf_Int32Value, Int32Value__Output as _google_protobuf_Int32Value__Output } from './google/protobuf/Int32Value';
import type { Int64Value as _google_protobuf_Int64Value, Int64Value__Output as _google_protobuf_Int64Value__Output } from './google/protobuf/Int64Value';
import type { ListValue as _google_protobuf_ListValue, ListValue__Output as _google_protobuf_ListValue__Output } from './google/protobuf/ListValue';
import type { MessageOptions as _google_protobuf_MessageOptions, MessageOptions__Output as _google_protobuf_MessageOptions__Output } from './google/protobuf/MessageOptions';
import type { MethodDescriptorProto as _google_protobuf_MethodDescriptorProto, MethodDescriptorProto__Output as _google_protobuf_MethodDescriptorProto__Output } from './google/protobuf/MethodDescriptorProto';
import type { MethodOptions as _google_protobuf_MethodOptions, MethodOptions__Output as _google_protobuf_MethodOptions__Output } from './google/protobuf/MethodOptions';
import type { OneofDescriptorProto as _google_protobuf_OneofDescriptorProto, OneofDescriptorProto__Output as _google_protobuf_OneofDescriptorProto__Output } from './google/protobuf/OneofDescriptorProto';
import type { OneofOptions as _google_protobuf_OneofOptions, OneofOptions__Output as _google_protobuf_OneofOptions__Output } from './google/protobuf/OneofOptions';
import type { ServiceDescriptorProto as _google_protobuf_ServiceDescriptorProto, ServiceDescriptorProto__Output as _google_protobuf_ServiceDescriptorProto__Output } from './google/protobuf/ServiceDescriptorProto';
import type { ServiceOptions as _google_protobuf_ServiceOptions, ServiceOptions__Output as _google_protobuf_ServiceOptions__Output } from './google/protobuf/ServiceOptions';
import type { SourceCodeInfo as _google_protobuf_SourceCodeInfo, SourceCodeInfo__Output as _google_protobuf_SourceCodeInfo__Output } from './google/protobuf/SourceCodeInfo';
import type { StringValue as _google_protobuf_StringValue, StringValue__Output as _google_protobuf_StringValue__Output } from './google/protobuf/StringValue';
import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from './google/protobuf/Struct';
import type { UInt32Value as _google_protobuf_UInt32Value, UInt32Value__Output as _google_protobuf_UInt32Value__Output } from './google/protobuf/UInt32Value';
import type { UInt64Value as _google_protobuf_UInt64Value, UInt64Value__Output as _google_protobuf_UInt64Value__Output } from './google/protobuf/UInt64Value';
import type { UninterpretedOption as _google_protobuf_UninterpretedOption, UninterpretedOption__Output as _google_protobuf_UninterpretedOption__Output } from './google/protobuf/UninterpretedOption';
import type { Value as _google_protobuf_Value, Value__Output as _google_protobuf_Value__Output } from './google/protobuf/Value';
import type { Contact as _grpc_gateway_protoc_gen_openapiv2_options_Contact, Contact__Output as _grpc_gateway_protoc_gen_openapiv2_options_Contact__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Contact';
import type { ExternalDocumentation as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation, ExternalDocumentation__Output as _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output } from './grpc/gateway/protoc_gen_openapiv2/options/ExternalDocumentation';
import type { Header as _grpc_gateway_protoc_gen_openapiv2_options_Header, Header__Output as _grpc_gateway_protoc_gen_openapiv2_options_Header__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Header';
import type { Info as _grpc_gateway_protoc_gen_openapiv2_options_Info, Info__Output as _grpc_gateway_protoc_gen_openapiv2_options_Info__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Info';
import type { JSONSchema as _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema, JSONSchema__Output as _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema__Output } from './grpc/gateway/protoc_gen_openapiv2/options/JSONSchema';
import type { License as _grpc_gateway_protoc_gen_openapiv2_options_License, License__Output as _grpc_gateway_protoc_gen_openapiv2_options_License__Output } from './grpc/gateway/protoc_gen_openapiv2/options/License';
import type { Operation as _grpc_gateway_protoc_gen_openapiv2_options_Operation, Operation__Output as _grpc_gateway_protoc_gen_openapiv2_options_Operation__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Operation';
import type { Response as _grpc_gateway_protoc_gen_openapiv2_options_Response, Response__Output as _grpc_gateway_protoc_gen_openapiv2_options_Response__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Response';
import type { Schema as _grpc_gateway_protoc_gen_openapiv2_options_Schema, Schema__Output as _grpc_gateway_protoc_gen_openapiv2_options_Schema__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Schema';
import type { Scopes as _grpc_gateway_protoc_gen_openapiv2_options_Scopes, Scopes__Output as _grpc_gateway_protoc_gen_openapiv2_options_Scopes__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Scopes';
import type { SecurityDefinitions as _grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions, SecurityDefinitions__Output as _grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions__Output } from './grpc/gateway/protoc_gen_openapiv2/options/SecurityDefinitions';
import type { SecurityRequirement as _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement, SecurityRequirement__Output as _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement__Output } from './grpc/gateway/protoc_gen_openapiv2/options/SecurityRequirement';
import type { SecurityScheme as _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme, SecurityScheme__Output as _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme__Output } from './grpc/gateway/protoc_gen_openapiv2/options/SecurityScheme';
import type { Swagger as _grpc_gateway_protoc_gen_openapiv2_options_Swagger, Swagger__Output as _grpc_gateway_protoc_gen_openapiv2_options_Swagger__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Swagger';
import type { Tag as _grpc_gateway_protoc_gen_openapiv2_options_Tag, Tag__Output as _grpc_gateway_protoc_gen_openapiv2_options_Tag__Output } from './grpc/gateway/protoc_gen_openapiv2/options/Tag';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  allocation: {
    AllocationRequest: MessageTypeDefinition<_allocation_AllocationRequest, _allocation_AllocationRequest__Output>
    AllocationResponse: MessageTypeDefinition<_allocation_AllocationResponse, _allocation_AllocationResponse__Output>
    AllocationService: SubtypeConstructor<typeof grpc.Client, _allocation_AllocationServiceClient> & { service: _allocation_AllocationServiceDefinition }
    CounterAction: MessageTypeDefinition<_allocation_CounterAction, _allocation_CounterAction__Output>
    CounterSelector: MessageTypeDefinition<_allocation_CounterSelector, _allocation_CounterSelector__Output>
    GameServerSelector: MessageTypeDefinition<_allocation_GameServerSelector, _allocation_GameServerSelector__Output>
    LabelSelector: MessageTypeDefinition<_allocation_LabelSelector, _allocation_LabelSelector__Output>
    ListAction: MessageTypeDefinition<_allocation_ListAction, _allocation_ListAction__Output>
    ListSelector: MessageTypeDefinition<_allocation_ListSelector, _allocation_ListSelector__Output>
    MetaPatch: MessageTypeDefinition<_allocation_MetaPatch, _allocation_MetaPatch__Output>
    MultiClusterSetting: MessageTypeDefinition<_allocation_MultiClusterSetting, _allocation_MultiClusterSetting__Output>
    PlayerSelector: MessageTypeDefinition<_allocation_PlayerSelector, _allocation_PlayerSelector__Output>
    Priority: MessageTypeDefinition<_allocation_Priority, _allocation_Priority__Output>
  }
  google: {
    api: {
      CustomHttpPattern: MessageTypeDefinition<_google_api_CustomHttpPattern, _google_api_CustomHttpPattern__Output>
      Http: MessageTypeDefinition<_google_api_Http, _google_api_Http__Output>
      HttpRule: MessageTypeDefinition<_google_api_HttpRule, _google_api_HttpRule__Output>
    }
    protobuf: {
      BoolValue: MessageTypeDefinition<_google_protobuf_BoolValue, _google_protobuf_BoolValue__Output>
      BytesValue: MessageTypeDefinition<_google_protobuf_BytesValue, _google_protobuf_BytesValue__Output>
      DescriptorProto: MessageTypeDefinition<_google_protobuf_DescriptorProto, _google_protobuf_DescriptorProto__Output>
      DoubleValue: MessageTypeDefinition<_google_protobuf_DoubleValue, _google_protobuf_DoubleValue__Output>
      Edition: EnumTypeDefinition
      EnumDescriptorProto: MessageTypeDefinition<_google_protobuf_EnumDescriptorProto, _google_protobuf_EnumDescriptorProto__Output>
      EnumOptions: MessageTypeDefinition<_google_protobuf_EnumOptions, _google_protobuf_EnumOptions__Output>
      EnumValueDescriptorProto: MessageTypeDefinition<_google_protobuf_EnumValueDescriptorProto, _google_protobuf_EnumValueDescriptorProto__Output>
      EnumValueOptions: MessageTypeDefinition<_google_protobuf_EnumValueOptions, _google_protobuf_EnumValueOptions__Output>
      ExtensionRangeOptions: MessageTypeDefinition<_google_protobuf_ExtensionRangeOptions, _google_protobuf_ExtensionRangeOptions__Output>
      FeatureSet: MessageTypeDefinition<_google_protobuf_FeatureSet, _google_protobuf_FeatureSet__Output>
      FeatureSetDefaults: MessageTypeDefinition<_google_protobuf_FeatureSetDefaults, _google_protobuf_FeatureSetDefaults__Output>
      FieldDescriptorProto: MessageTypeDefinition<_google_protobuf_FieldDescriptorProto, _google_protobuf_FieldDescriptorProto__Output>
      FieldOptions: MessageTypeDefinition<_google_protobuf_FieldOptions, _google_protobuf_FieldOptions__Output>
      FileDescriptorProto: MessageTypeDefinition<_google_protobuf_FileDescriptorProto, _google_protobuf_FileDescriptorProto__Output>
      FileDescriptorSet: MessageTypeDefinition<_google_protobuf_FileDescriptorSet, _google_protobuf_FileDescriptorSet__Output>
      FileOptions: MessageTypeDefinition<_google_protobuf_FileOptions, _google_protobuf_FileOptions__Output>
      FloatValue: MessageTypeDefinition<_google_protobuf_FloatValue, _google_protobuf_FloatValue__Output>
      GeneratedCodeInfo: MessageTypeDefinition<_google_protobuf_GeneratedCodeInfo, _google_protobuf_GeneratedCodeInfo__Output>
      Int32Value: MessageTypeDefinition<_google_protobuf_Int32Value, _google_protobuf_Int32Value__Output>
      Int64Value: MessageTypeDefinition<_google_protobuf_Int64Value, _google_protobuf_Int64Value__Output>
      ListValue: MessageTypeDefinition<_google_protobuf_ListValue, _google_protobuf_ListValue__Output>
      MessageOptions: MessageTypeDefinition<_google_protobuf_MessageOptions, _google_protobuf_MessageOptions__Output>
      MethodDescriptorProto: MessageTypeDefinition<_google_protobuf_MethodDescriptorProto, _google_protobuf_MethodDescriptorProto__Output>
      MethodOptions: MessageTypeDefinition<_google_protobuf_MethodOptions, _google_protobuf_MethodOptions__Output>
      NullValue: EnumTypeDefinition
      OneofDescriptorProto: MessageTypeDefinition<_google_protobuf_OneofDescriptorProto, _google_protobuf_OneofDescriptorProto__Output>
      OneofOptions: MessageTypeDefinition<_google_protobuf_OneofOptions, _google_protobuf_OneofOptions__Output>
      ServiceDescriptorProto: MessageTypeDefinition<_google_protobuf_ServiceDescriptorProto, _google_protobuf_ServiceDescriptorProto__Output>
      ServiceOptions: MessageTypeDefinition<_google_protobuf_ServiceOptions, _google_protobuf_ServiceOptions__Output>
      SourceCodeInfo: MessageTypeDefinition<_google_protobuf_SourceCodeInfo, _google_protobuf_SourceCodeInfo__Output>
      StringValue: MessageTypeDefinition<_google_protobuf_StringValue, _google_protobuf_StringValue__Output>
      Struct: MessageTypeDefinition<_google_protobuf_Struct, _google_protobuf_Struct__Output>
      SymbolVisibility: EnumTypeDefinition
      UInt32Value: MessageTypeDefinition<_google_protobuf_UInt32Value, _google_protobuf_UInt32Value__Output>
      UInt64Value: MessageTypeDefinition<_google_protobuf_UInt64Value, _google_protobuf_UInt64Value__Output>
      UninterpretedOption: MessageTypeDefinition<_google_protobuf_UninterpretedOption, _google_protobuf_UninterpretedOption__Output>
      Value: MessageTypeDefinition<_google_protobuf_Value, _google_protobuf_Value__Output>
    }
  }
  grpc: {
    gateway: {
      protoc_gen_openapiv2: {
        options: {
          Contact: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Contact, _grpc_gateway_protoc_gen_openapiv2_options_Contact__Output>
          ExternalDocumentation: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation, _grpc_gateway_protoc_gen_openapiv2_options_ExternalDocumentation__Output>
          Header: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Header, _grpc_gateway_protoc_gen_openapiv2_options_Header__Output>
          Info: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Info, _grpc_gateway_protoc_gen_openapiv2_options_Info__Output>
          JSONSchema: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_JSONSchema, _grpc_gateway_protoc_gen_openapiv2_options_JSONSchema__Output>
          License: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_License, _grpc_gateway_protoc_gen_openapiv2_options_License__Output>
          Operation: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Operation, _grpc_gateway_protoc_gen_openapiv2_options_Operation__Output>
          Response: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Response, _grpc_gateway_protoc_gen_openapiv2_options_Response__Output>
          Schema: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Schema, _grpc_gateway_protoc_gen_openapiv2_options_Schema__Output>
          Scheme: EnumTypeDefinition
          Scopes: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Scopes, _grpc_gateway_protoc_gen_openapiv2_options_Scopes__Output>
          SecurityDefinitions: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions, _grpc_gateway_protoc_gen_openapiv2_options_SecurityDefinitions__Output>
          SecurityRequirement: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement, _grpc_gateway_protoc_gen_openapiv2_options_SecurityRequirement__Output>
          SecurityScheme: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme, _grpc_gateway_protoc_gen_openapiv2_options_SecurityScheme__Output>
          Swagger: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Swagger, _grpc_gateway_protoc_gen_openapiv2_options_Swagger__Output>
          Tag: MessageTypeDefinition<_grpc_gateway_protoc_gen_openapiv2_options_Tag, _grpc_gateway_protoc_gen_openapiv2_options_Tag__Output>
        }
      }
    }
  }
}

