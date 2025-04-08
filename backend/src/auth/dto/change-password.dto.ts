import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
    @IsString()
    @ApiProperty({ example: 'senhaAntiga123' })
    currentPassword: string;

    @IsString()
    @ApiProperty({ example: 'novaSenha123' })
    newPassword: string;
}