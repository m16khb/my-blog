import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME } from '@proto/user.pb';
import { join } from 'path';
import * as process from 'node:process';
import { RpcExceptionFilter } from '@app/filter';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { Resource } from '@opentelemetry/resources';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { TypeormInstrumentation } from 'opentelemetry-instrumentation-typeorm';
import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs';

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces', // OTel Collector GRPC endpoint
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: 'user',
  }),
  spanProcessors: [new SimpleSpanProcessor(traceExporter)],
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-dns': { enabled: false },
      '@opentelemetry/instrumentation-net': { enabled: false },
    }),
    new TypeormInstrumentation(),
    new KafkaJsInstrumentation(),
  ],
});
sdk.start();

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  // const configService: ConfigService = app.get<ConfigService>(ConfigService);

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

  app.useGlobalFilters(new RpcExceptionFilter());

  await app.startAllMicroservices();
  await app.listen(httpPort);
}
bootstrap();

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});
