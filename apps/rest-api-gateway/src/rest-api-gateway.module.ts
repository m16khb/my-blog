import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@proto/user.pb';
import { AUTH_PACKAGE_NAME } from '@proto/auth.pb';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'GRPC_AUTH_CLIENT',
          useFactory: () => {
            return {
              transport: Transport.GRPC,
              options: {
                url: 'localhost:30001',
                package: [AUTH_PACKAGE_NAME],
                protoPath: [join(__dirname, '../../../', 'proto/auth.proto')],
                loader: {
                  keepCase: true,
                  longs: String,
                  enums: String,
                  oneofs: true,
                },
              },
            };
          },
        },
        {
          name: 'GRPC_USER_CLIENT',
          useFactory: () => {
            return {
              transport: Transport.GRPC,
              options: {
                url: 'localhost:30002',
                package: [USER_PACKAGE_NAME],
                protoPath: [join(__dirname, '../../../', 'proto/user.proto')],
                loader: {
                  keepCase: true,
                  longs: String,
                  enums: String,
                  oneofs: true,
                },
              },
            };
          },
        },
      ],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
})
export class RestApiGatewayModule {}
