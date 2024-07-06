import { instanceToPlain } from 'class-transformer';
import { catchError, Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

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
