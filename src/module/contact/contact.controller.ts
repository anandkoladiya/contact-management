
import { Controller, Post, Body, HttpStatus, Param, Get, Put, Delete, Query, HttpException, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactByIdDto, ContactListDto, CreateContactDto } from './contact.dto';
import { CustomException } from 'src/filter/custom-exception.filter';
import { plainToClass } from 'class-transformer';
import { ConvertQueryParamInterceptor } from 'src/filter/convert-query-param.interceptor';

@Controller('contact')
export class ContactController {
    constructor() { }

    @Post('/')
    async createContact(@Body() contactData: CreateContactDto) {
        try {
            const { email, phone } = contactData
            const contactService = new ContactService()
            const existingEmailContact = await contactService.findFirst({ email });
            if (existingEmailContact) {
                throw new CustomException('Email already exists.', HttpStatus.FORBIDDEN);
            }
            const existingPhoneContact = await contactService.findFirst({ phone });
            if (existingPhoneContact) {
                throw new CustomException('Phone already exists.', HttpStatus.FORBIDDEN);
            }
            const createdContact = await contactService.create(contactData);
            const { createdAt, updatedAt, deletedAt, ...contactDetails } = createdContact;
            return contactDetails;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomException) {
                throw new CustomException(error.message, error.getStatus());
            }
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    @Put('/:id')
    async updateContactById(@Param('id') id: number, @Body() body: CreateContactDto) {
        try {
            const { email, phone } = body;
            const contactService = new ContactService()
            const isContactExist = await contactService.findById(Number(id));
            if (!isContactExist || isContactExist.deletedAt) {
                throw new CustomException('Contact not found.', HttpStatus.NOT_FOUND);
            }
            const existingEmailContact = await contactService.findFirst({ email, NOT: { id: Number(id) } });
            if (existingEmailContact) {
                throw new CustomException('Email already exists.', HttpStatus.FORBIDDEN);
            }
            const existingPhoneContact = await contactService.findFirst({ phone, NOT: { id: Number(id) } });
            if (existingPhoneContact) {
                throw new CustomException('Phone already exists.', HttpStatus.FORBIDDEN);
            }
            const contactDetails = await contactService.updateById(Number(id), body);
            const { createdAt, updatedAt, deletedAt, ...contactData } = contactDetails;
            return contactData;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomException) {
                throw new CustomException(error.message, error.getStatus());
            }
            throw new CustomException('Custom Error Message', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('/:id')
    async deleteContactById(@Param('id') id: number) {
        try {
            const contactService = new ContactService()
            const contactDetails = await contactService.findById(Number(id));
            if (!contactDetails || contactDetails.deletedAt) {
                throw new CustomException('Contact not found.', HttpStatus.NOT_FOUND);
            }
            await contactService.updateById(Number(id), { deletedAt: new Date() });
            return 'Successfully deleted';
        } catch (error) {
            console.log(error);
            if (error instanceof CustomException) {
                throw new CustomException(error.message, error.getStatus());
            }
            throw new CustomException('Custom Error Message', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/list')
    @UseInterceptors(ConvertQueryParamInterceptor)
    async getContactList(@Query() query: ContactListDto) {
        try {
            const contactService = new ContactService()
            const contactDetails = await contactService.findMany(query);
            return contactDetails;
        } catch (error) {
            console.log(error);
            throw new CustomException('Custom Error Message', HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/:id')
    async getContactById(@Param('id') id: number) {
        try {
            const contactService = new ContactService()
            const contactDetails = await contactService.findById(Number(id));
            if (!contactDetails || contactDetails.deletedAt) {
                throw new CustomException('Contact not found.', HttpStatus.NOT_FOUND);
            }
            const { createdAt, updatedAt, deletedAt, ...contactData } = contactDetails;
            return contactData;
        } catch (error) {
            console.log(error);
            if (error instanceof CustomException) {
                throw new CustomException(error.message, error.getStatus());
            }
            throw new CustomException('Custom Error Message', HttpStatus.BAD_REQUEST);
        }
    }
}




