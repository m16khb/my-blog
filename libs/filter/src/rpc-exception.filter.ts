import { Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: unknown): Observable<never> {
    if (exception instanceof RpcException) {
      return throwError(() => exception.getError());
    } else {
      return throwError(
        () =>
          new RpcException({
            code: status.INTERNAL,
            message: 'Internal server error',
          }),
      );
    }
  }
}
