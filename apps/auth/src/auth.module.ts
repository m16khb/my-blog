import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entity/user.entity';
import { TokenEntity } from './entity/token.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USER_PACKAGE_NAME } from '@proto/user.pb';
import { CryptoModule } from '@app/crypto';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME_AUTH'),
        entities: [UserEntity, TokenEntity],
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
    ClientsModule.registerAsync({
      clients: [
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
                  defaults: true,
                  oneofs: true,
                },
              },
            };
          },
        },
      ],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // jwt token 생성 옵션 설정
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    CryptoModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
