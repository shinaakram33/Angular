import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, IsEmail, MaxLength, MinLength } from 'class-validator'

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;

    @IsString()
    role: string;
}
