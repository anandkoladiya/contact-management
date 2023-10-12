import { Transform } from 'class-transformer';
import { IsNotEmpty, IsEmail, IsNumber, isPositive, IsPositive, IsString, IsOptional, IS_LENGTH, MaxLength, Matches, MinLength, Max, Min, IsEnum } from 'class-validator';

export class CreateContactDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @Max(9999999999, { message: 'Phone number is too long, maximum 10 characters allowed' })
    @Min(1000000000, { message: 'Phone number is too short, minimum 10 characters allowed' })
    phone: number;

    @IsNotEmpty()
    name: string;
}

export class ContactByIdDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

}
export enum Fields {
    email = "email",
    phone = "phone",
    name = "name"
}
export enum Sort {
    asc = "asc",
    desc = "desc"
}

export class ContactListDto {

    @IsNumber()
    @IsPositive()
    @IsOptional()
    pageNumber?: number

    @IsNumber()
    @IsPositive()
    @IsOptional()
    pageLimit?: number

    @IsString()
    @IsOptional()
    search?: string

    @IsString()
    @IsOptional()
    @IsEnum(Fields)
    searchBy?: Fields

    @IsString()
    @IsOptional()
    @IsEnum(Sort)
    sort?: Sort

    @IsString()
    @IsOptional()
    @IsEnum(Fields)
    sortBy?: Fields
}