import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    confirmPassword: string;
}
