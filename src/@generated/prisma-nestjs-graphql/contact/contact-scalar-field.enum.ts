import { registerEnumType } from '@nestjs/graphql';

export enum ContactScalarFieldEnum {
    id = "id",
    email = "email",
    phone = "phone",
    name = "name",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    deletedAt = "deletedAt"
}


registerEnumType(ContactScalarFieldEnum, { name: 'ContactScalarFieldEnum', description: undefined })
