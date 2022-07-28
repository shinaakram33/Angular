import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator'
export class LoginUserDTO {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;
}
