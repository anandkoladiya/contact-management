// import { Injectable } from '@nestjs/common';
// import { CreateContactDto } from './contact.dto';
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// @Injectable()
// export class ContactService {

//     async createContact(contactData: CreateContactDto): Promise<any> {
//         return await prisma.contact.create({ data: contactData });
//     }

// }


import { Injectable, ConflictException } from '@nestjs/common';
import { ContactListDto, CreateContactDto, Fields, Sort } from './contact.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ContactService {
    async create(contactData: CreateContactDto): Promise<any> {
        return await prisma.contact.create({ data: contactData });
    }

    async findFirst(where: Object): Promise<any> {
        return await prisma.contact.findFirst({ where });
    }

    async findById(id: number): Promise<any> {
        console.log(id, 33);

        return await prisma.contact.findUnique({ where: { id } });
    }

    async updateById(id: number, data: Object): Promise<any> {
        return await prisma.contact.update({ where: { id }, data });
    }

    async findMany(data: ContactListDto): Promise<any> {
        const { search, searchBy = Fields.name, sort = Sort.desc, sortBy = Fields.name, pageLimit = 10, pageNumber = 1 } = data
        let query: any = { where: { deletedAt: null } };
        if (search) {
            query.where = {
                deletedAt: null,
                [searchBy]: {
                    contains: search
                }
            }
        };
        const list = await prisma.contact.findMany({
            ...query,
            take: pageLimit,
            skip: (pageNumber - 1) * pageLimit,
            orderBy: {
                [sortBy]: sort
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
            }
        });
        const totalCount = await prisma.contact.count(query);

        return { pageLimit, pageNumber, totalCount, list }
    }

}