import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME, RPC_AUTH_SERVICE_NAME } from '@proto/auth.pb';
import { join } from 'path';
import { RPC_USER_SERVICE_NAME, USER_PACKAGE_NAME } from '@proto/user.pb';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ClientsModule.registerAsync({
      clients: [
        {
          name: RPC_AUTH_SERVICE_NAME,
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: 'localhost:30001',
              package: [AUTH_PACKAGE_NAME],
              protoPath: [join(__dirname, '../../../', 'proto/auth.proto')],
            },
          }),
        },
        {
          name: RPC_USER_SERVICE_NAME,
          useFactory: () => ({
            transport: Transport.GRPC,
            options: {
              url: 'localhost:30002',
              package: [USER_PACKAGE_NAME],
              protoPath: [join(__dirname, '../../../', 'proto/user.proto')],
            },
          }),
        },
      ],
      isGlobal: true,
    }),
    UserModule,
  ],
  controllers: [],
})
export class RestApiGatewayModule {}
