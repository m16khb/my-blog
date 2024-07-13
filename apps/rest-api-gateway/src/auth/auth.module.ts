import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '@app/guard';

@Module({
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
