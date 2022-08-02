import { IsNotEmpty, IsString, MaxLength, MinLength, IsNumber } from 'class-validator'
export class ValidatePincodeDto {
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
