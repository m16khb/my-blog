import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { RestApiGatewayModule } from './rest-api-gateway.module';
import { AllExceptionFilter } from '@app/filter';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RestApiGatewayModule);

  const httpPort = process.env.HTTP_PORT || 3000;

  const httpAdapter = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));

  setupSwagger(app);

  await app.listen(httpPort);
}
bootstrap();

/**
 * Swagger 세팅
 *
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('my-blog api docs')
    .setDescription('my-blog api description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
