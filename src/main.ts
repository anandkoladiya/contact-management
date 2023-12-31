import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { server } from './config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  BigInt.prototype["toJSON"] = function () {
    return this.toString();
  };
  await app.listen(server.PORT || 8000);
}
bootstrap();



