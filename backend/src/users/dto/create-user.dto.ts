import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'Davi Speck' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'davi@b4you.dev' })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'Abc123@#',
        description: 'Senha com mínimo de 8 caracteres, contendo letra maiúscula, minúscula, número e caractere especial',
    })
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
            'A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial',
    })
    password: string;
}
