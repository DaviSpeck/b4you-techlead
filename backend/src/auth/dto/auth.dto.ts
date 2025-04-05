import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({ example: 'davi@b4you.dev' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString({ message: 'A senha deve ser uma string' })
    password: string;
}