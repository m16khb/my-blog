import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { RestApiGatewayModule } from './rest-api-gateway.module';
import { AllExceptionFilter } from '@app/filter';

async function bootstrap() {
  const app = await NestFactory.create(RestApiGatewayModule);

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
