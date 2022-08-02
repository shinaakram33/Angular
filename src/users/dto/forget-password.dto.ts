import { IsString, IsEmail } from 'class-validator'
export class ForgetPasswordDto {
    @IsString()
    @IsEmail()
    email: string;
}
