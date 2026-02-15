// Original file: C:/Users/Corentin/Desktop/OrganizationCrzGames/agones/proto/allocation/allocation.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AllocationRequest as _allocation_AllocationRequest, AllocationRequest__Output as _allocation_AllocationRequest__Output } from '../allocation/AllocationRequest';
import type { AllocationResponse as _allocation_AllocationResponse, AllocationResponse__Output as _allocation_AllocationResponse__Output } from '../allocation/AllocationResponse';

export interface AllocationServiceClient extends grpc.Client {
  Allocate(argument: _allocation_AllocationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  Allocate(argument: _allocation_AllocationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  Allocate(argument: _allocation_AllocationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  Allocate(argument: _allocation_AllocationRequest, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  allocate(argument: _allocation_AllocationRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  allocate(argument: _allocation_AllocationRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  allocate(argument: _allocation_AllocationRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  allocate(argument: _allocation_AllocationRequest, callback: grpc.requestCallback<_allocation_AllocationResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AllocationServiceHandlers extends grpc.UntypedServiceImplementation {
  Allocate: grpc.handleUnaryCall<_allocation_AllocationRequest__Output, _allocation_AllocationResponse>;
  
}

export interface AllocationServiceDefinition extends grpc.ServiceDefinition {
  Allocate: MethodDefinition<_allocation_AllocationRequest, _allocation_AllocationResponse, _allocation_AllocationRequest__Output, _allocation_AllocationResponse__Output>
}
