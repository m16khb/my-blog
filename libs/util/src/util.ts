import { instanceToPlain } from 'class-transformer';
import { catchError, Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@proto/user.pb';
import { SetMetadata } from '@nestjs/common';

export function createProxy<T extends object>(client: T): T {
  return new Proxy(client, {
    get: (target: T, propKey: string | symbol) => {
      const originalMethod = target[propKey as keyof T];
      if (typeof originalMethod === 'function') {
        return (...args: unknown[]) => {
          const result = originalMethod.apply(target, args);
          if (result instanceof Observable) {
            return (result as Observable<unknown>).pipe(
              catchError((error: unknown) =>
                throwError(() => new RpcException(error as Error)),
              ),
            );
          }
          return result;
        };
      }
      return originalMethod;
    },
  });
}

export function serialize(object: any) {
  return JSON.parse(JSON.stringify(instanceToPlain(object)));
}

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const rpcContext = ctx.switchToRpc();
    const request = rpcContext.getData();

    return request.user;
  },
);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
