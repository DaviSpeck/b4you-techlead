import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'Novo Nome' })
    name?: string;
}