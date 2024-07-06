import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '@proto/user.pb';
import { join } from 'path';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const httpPort = process.env.HTTP_PORT || 3002;
  const grpcPort = process.env.GRPC_PORT || 30002;
  const protoPath: string = '../../../proto/';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${grpcPort}`,
      protoPath: [join(__dirname, protoPath + 'user.proto')],
      package: [USER_PACKAGE_NAME],
    },
  });

  await app.startAllMicroservices();
  await app.listen(httpPort);
}
bootstrap();
