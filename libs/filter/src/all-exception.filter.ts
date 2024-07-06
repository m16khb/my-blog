import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();
      responseBody = {
        ...responseBody,
        message: typeof response === 'string' ? response : response['message'],
      };
    } else if (exception instanceof RpcException) {
      const rpcError = exception.getError() as {
        code: number;
        message: string;
        details: string;
      };
      httpStatus = this.mapRpcStatusToHttpStatus(rpcError.code);
      responseBody = {
        ...responseBody,
        message: rpcError.details || 'Unknown gRPC error',
      };
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }

  private mapRpcStatusToHttpStatus(rpcStatus: number): HttpStatus {
    const statusCodeMap = {
      [status.NOT_FOUND]: HttpStatus.NOT_FOUND,
      [status.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
      [status.ALREADY_EXISTS]: HttpStatus.CONFLICT,
      [status.PERMISSION_DENIED]: HttpStatus.FORBIDDEN,
      [status.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
      [status.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    return statusCodeMap[rpcStatus] || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}
