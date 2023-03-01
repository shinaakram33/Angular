import { IsNotEmpty, IsString, IsEmail, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
