import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as process from 'node:process';
import { AUTH_PACKAGE_NAME } from '@proto/auth.pb';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
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
    [SEMRESATTRS_SERVICE_NAME]: 'auth',
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
  const app = await NestFactory.create(AuthModule);

  const httpPort = process.env.HTTP_PORT || 3001;
  const grpcPort = process.env.GRPC_PORT || 30001;
  const protoPath: string = '../../../proto/';

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${grpcPort}`,
      protoPath: [join(__dirname, protoPath + 'auth.proto')],
      package: [AUTH_PACKAGE_NAME],
    },
  });

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
