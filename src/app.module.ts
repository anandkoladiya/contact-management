import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactModule } from './module/contact/contact.module';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './filter/custom-exception.filter';

@Module({
  imports: [ContactModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CustomExceptionFilter },],
})
export class AppModule { }
