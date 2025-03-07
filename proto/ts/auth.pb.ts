// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.0
//   protoc               v4.23.2
// source: auth.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { messageTypeRegistry } from "./typeRegistry";
import { User } from "./user.pb";

export const protobufPackage = "auth";

export interface Token {
  $type: "auth.Token";
  accessToken?: string | undefined;
  refreshToken?: string | undefined;
}

export interface LoginRequest {
  $type: "auth.LoginRequest";
  loginId?: string | undefined;
  password?: string | undefined;
}

export interface LoginResponse {
  $type: "auth.LoginResponse";
  token?: Token | undefined;
}

export interface LogoutRequest {
  $type: "auth.LogoutRequest";
  userId?: string | undefined;
}

export interface LogoutResponse {
  $type: "auth.LogoutResponse";
  success?: boolean | undefined;
}

export interface GenerateTokenRequest {
  $type: "auth.GenerateTokenRequest";
  user?: User | undefined;
}

export interface GenerateTokenResponse {
  $type: "auth.GenerateTokenResponse";
  token?: Token | undefined;
}

export interface ValidateTokenRequest {
  $type: "auth.ValidateTokenRequest";
  accessToken?: string | undefined;
}

export interface ValidateTokenResponse {
  $type: "auth.ValidateTokenResponse";
  valid?: boolean | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

function createBaseToken(): Token {
  return { $type: "auth.Token" };
}

export const Token = {
  $type: "auth.Token" as const,

  create(base?: DeepPartial<Token>): Token {
    return Token.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Token>): Token {
    const message = Object.create(createBaseToken()) as Token;
    message.accessToken = object.accessToken ?? undefined;
    message.refreshToken = object.refreshToken ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(Token.$type, Token);

function createBaseLoginRequest(): LoginRequest {
  return { $type: "auth.LoginRequest" };
}

export const LoginRequest = {
  $type: "auth.LoginRequest" as const,

  create(base?: DeepPartial<LoginRequest>): LoginRequest {
    return LoginRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LoginRequest>): LoginRequest {
    const message = Object.create(createBaseLoginRequest()) as LoginRequest;
    message.loginId = object.loginId ?? undefined;
    message.password = object.password ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(LoginRequest.$type, LoginRequest);

function createBaseLoginResponse(): LoginResponse {
  return { $type: "auth.LoginResponse" };
}

export const LoginResponse = {
  $type: "auth.LoginResponse" as const,

  create(base?: DeepPartial<LoginResponse>): LoginResponse {
    return LoginResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LoginResponse>): LoginResponse {
    const message = Object.create(createBaseLoginResponse()) as LoginResponse;
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    return message;
  },
};

messageTypeRegistry.set(LoginResponse.$type, LoginResponse);

function createBaseLogoutRequest(): LogoutRequest {
  return { $type: "auth.LogoutRequest" };
}

export const LogoutRequest = {
  $type: "auth.LogoutRequest" as const,

  create(base?: DeepPartial<LogoutRequest>): LogoutRequest {
    return LogoutRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LogoutRequest>): LogoutRequest {
    const message = Object.create(createBaseLogoutRequest()) as LogoutRequest;
    message.userId = object.userId ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(LogoutRequest.$type, LogoutRequest);

function createBaseLogoutResponse(): LogoutResponse {
  return { $type: "auth.LogoutResponse" };
}

export const LogoutResponse = {
  $type: "auth.LogoutResponse" as const,

  create(base?: DeepPartial<LogoutResponse>): LogoutResponse {
    return LogoutResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<LogoutResponse>): LogoutResponse {
    const message = Object.create(createBaseLogoutResponse()) as LogoutResponse;
    message.success = object.success ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(LogoutResponse.$type, LogoutResponse);

function createBaseGenerateTokenRequest(): GenerateTokenRequest {
  return { $type: "auth.GenerateTokenRequest" };
}

export const GenerateTokenRequest = {
  $type: "auth.GenerateTokenRequest" as const,

  create(base?: DeepPartial<GenerateTokenRequest>): GenerateTokenRequest {
    return GenerateTokenRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenerateTokenRequest>): GenerateTokenRequest {
    const message = Object.create(createBaseGenerateTokenRequest()) as GenerateTokenRequest;
    message.user = (object.user !== undefined && object.user !== null) ? User.fromPartial(object.user) : undefined;
    return message;
  },
};

messageTypeRegistry.set(GenerateTokenRequest.$type, GenerateTokenRequest);

function createBaseGenerateTokenResponse(): GenerateTokenResponse {
  return { $type: "auth.GenerateTokenResponse" };
}

export const GenerateTokenResponse = {
  $type: "auth.GenerateTokenResponse" as const,

  create(base?: DeepPartial<GenerateTokenResponse>): GenerateTokenResponse {
    return GenerateTokenResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<GenerateTokenResponse>): GenerateTokenResponse {
    const message = Object.create(createBaseGenerateTokenResponse()) as GenerateTokenResponse;
    message.token = (object.token !== undefined && object.token !== null) ? Token.fromPartial(object.token) : undefined;
    return message;
  },
};

messageTypeRegistry.set(GenerateTokenResponse.$type, GenerateTokenResponse);

function createBaseValidateTokenRequest(): ValidateTokenRequest {
  return { $type: "auth.ValidateTokenRequest" };
}

export const ValidateTokenRequest = {
  $type: "auth.ValidateTokenRequest" as const,

  create(base?: DeepPartial<ValidateTokenRequest>): ValidateTokenRequest {
    return ValidateTokenRequest.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ValidateTokenRequest>): ValidateTokenRequest {
    const message = Object.create(createBaseValidateTokenRequest()) as ValidateTokenRequest;
    message.accessToken = object.accessToken ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ValidateTokenRequest.$type, ValidateTokenRequest);

function createBaseValidateTokenResponse(): ValidateTokenResponse {
  return { $type: "auth.ValidateTokenResponse" };
}

export const ValidateTokenResponse = {
  $type: "auth.ValidateTokenResponse" as const,

  create(base?: DeepPartial<ValidateTokenResponse>): ValidateTokenResponse {
    return ValidateTokenResponse.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ValidateTokenResponse>): ValidateTokenResponse {
    const message = Object.create(createBaseValidateTokenResponse()) as ValidateTokenResponse;
    message.valid = object.valid ?? undefined;
    return message;
  },
};

messageTypeRegistry.set(ValidateTokenResponse.$type, ValidateTokenResponse);

export interface RpcAuthServiceClient {
  logIn(request: LoginRequest, ...rest: any): Observable<LoginResponse>;

  logOut(request: LogoutRequest, ...rest: any): Observable<LogoutResponse>;

  generateToken(request: GenerateTokenRequest, ...rest: any): Observable<GenerateTokenResponse>;

  validateToken(request: ValidateTokenRequest, ...rest: any): Observable<ValidateTokenResponse>;
}

export interface RpcAuthServiceController {
  logIn(request: LoginRequest, ...rest: any): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  logOut(request: LogoutRequest, ...rest: any): Promise<LogoutResponse> | Observable<LogoutResponse> | LogoutResponse;

  generateToken(
    request: GenerateTokenRequest,
    ...rest: any
  ): Promise<GenerateTokenResponse> | Observable<GenerateTokenResponse> | GenerateTokenResponse;

  validateToken(
    request: ValidateTokenRequest,
    ...rest: any
  ): Promise<ValidateTokenResponse> | Observable<ValidateTokenResponse> | ValidateTokenResponse;
}

export function RpcAuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["logIn", "logOut", "generateToken", "validateToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RpcAuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RpcAuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RPC_AUTH_SERVICE_NAME = "RpcAuthService";

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in Exclude<keyof T, "$type">]?: DeepPartial<T[K]> }
  : Partial<T>;
