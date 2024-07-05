import { Module } from '@nestjs/common';
import { RestApiGatewayController } from './rest-api-gateway.controller';

@Module({
  imports: [],
  controllers: [RestApiGatewayController],
})
export class RestApiGatewayModule {}
