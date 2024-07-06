import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as process from 'node:process';
import { AUTH_PACKAGE_NAME } from '@proto/auth.pb';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  const httpPort = process.env.HTTP_PORT || 3001;
  const grpcPort = process.env.GRPC_PORT || 30001;
  const protoPath: string = '../../../proto/';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${grpcPort}`,
      protoPath: [join(__dirname, protoPath + 'auth.proto')],
      package: [AUTH_PACKAGE_NAME],
    },
  });

  await app.startAllMicroservices();
  await app.listen(httpPort);
}
bootstrap();
