import { Controller, Get } from '@nestjs/common';

@Controller()
export class RestApiGatewayController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
