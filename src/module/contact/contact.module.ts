import { Module } from '@nestjs/common';
import { ContactResolver } from 'src/module/contact/contact.controller';
import { ContactService } from './contact.service';

@Module({
  // imports: [],
  providers: [ContactResolver, ContactService]
})
export class ContactModule { }
