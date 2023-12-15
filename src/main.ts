import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from './order/order.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
  {
      transport: Transport.GRPC,
      options: {
        url:"0.0.0.0:50053",
        package: protobufPackage,
        protoPath: join('node_modules/microservicios/proto/order.proto')
      }
  }
  );
  await app.listen();
}
bootstrap();
