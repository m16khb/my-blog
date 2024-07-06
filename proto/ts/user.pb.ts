// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.0
//   protoc               v4.23.2
// source: user.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { messageTypeRegistry } from "./typeRegistry";

export const protobufPackage = "user";

export interface User {
  $type: "user.User";
  id?: string | undefined;
  loginId?: string | undefined;
  name?: string | undefined;
}

export interface CreateUserRequest {
  $type: "user.CreateUserRequest";
  loginId?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
}

export interface CreateUserResponse {
  $type: "user.CreateUserResponse";
  id?: string | undefined;
}

export interface FindOneUserRequest {
  $type: "user.FindOneUserRequest";
  id?: string | undefined;
}

export interface FindOneUserResponse {
  $type: "user.FindOneUserResponse";
  user?: User | undefined;
}

export const USER_PACKAGE_NAME = "user";

function createBaseUser(): User {
  return { $type: "user.User" };
}

export const User = {
  $type: "user.User" as const,

  create(base?: DeepPartial<User>): User {
    return User.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<User>): User {
    const message = Object.create(createBaseUser()) as User;
    message.id = object.id ?? undefined;
    message.loginId = object.loginId ?? undefined;
    message.name = object.name ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(User.$type, User);

function createBaseCreateUserRequest(): CreateUserRequest {
  return { $type: "user.CreateUserRequest" };
}

export const CreateUserRequest = {
  $type: "user.CreateUserRequest" as const,

  create(base?: DeepPartial<CreateUserRequest>): CreateUserRequest {
    return CreateUserRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateUserRequest>): CreateUserRequest {
    const message = Object.create(createBaseCreateUserRequest()) as CreateUserRequest;
    message.loginId = object.loginId ?? undefined;
    message.password = object.password ?? undefined;
    message.name = object.name ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateUserRequest.$type, CreateUserRequest);

function createBaseCreateUserResponse(): CreateUserResponse {
  return { $type: "user.CreateUserResponse" };
}

export const CreateUserResponse = {
  $type: "user.CreateUserResponse" as const,

  create(base?: DeepPartial<CreateUserResponse>): CreateUserResponse {
    return CreateUserResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<CreateUserResponse>): CreateUserResponse {
    const message = Object.create(createBaseCreateUserResponse()) as CreateUserResponse;
    message.id = object.id ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(CreateUserResponse.$type, CreateUserResponse);

function createBaseFindOneUserRequest(): FindOneUserRequest {
  return { $type: "user.FindOneUserRequest" };
}

export const FindOneUserRequest = {
  $type: "user.FindOneUserRequest" as const,

  create(base?: DeepPartial<FindOneUserRequest>): FindOneUserRequest {
    return FindOneUserRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FindOneUserRequest>): FindOneUserRequest {
    const message = Object.create(createBaseFindOneUserRequest()) as FindOneUserRequest;
    message.id = object.id ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(FindOneUserRequest.$type, FindOneUserRequest);

function createBaseFindOneUserResponse(): FindOneUserResponse {
  return { $type: "user.FindOneUserResponse" };
}

export const FindOneUserResponse = {
  $type: "user.FindOneUserResponse" as const,

  create(base?: DeepPartial<FindOneUserResponse>): FindOneUserResponse {
    return FindOneUserResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FindOneUserResponse>): FindOneUserResponse {
    const message = Object.create(createBaseFindOneUserResponse()) as FindOneUserResponse;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(FindOneUserResponse.$type, FindOneUserResponse);

export interface RpcUserServiceClient {
  createUser(request: CreateUserRequest, ...rest: any): Observable<CreateUserResponse>;

  findOneUser(request: FindOneUserRequest, ...rest: any): Observable<FindOneUserResponse>;
}

export interface RpcUserServiceController {
  createUser(
    request: CreateUserRequest,
    ...rest: any
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  findOneUser(
    request: FindOneUserRequest,
    ...rest: any
  ): Promise<FindOneUserResponse> | Observable<FindOneUserResponse> | FindOneUserResponse;
}

export function RpcUserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findOneUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RpcUserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RpcUserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RPC_USER_SERVICE_NAME = "RpcUserService";

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;
