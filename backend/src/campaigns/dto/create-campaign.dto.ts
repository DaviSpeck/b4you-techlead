import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CampaignStatus } from '@prisma/client';

export class CreateCampaignDto {
    @ApiProperty({ example: 'Campanha de verão', description: 'Nome da campanha' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 10000.0, description: 'Orçamento da campanha' })
    @IsNumber()
    budget: number;

    @ApiProperty({
        example: CampaignStatus.DRAFT,
        enum: CampaignStatus,
        description: 'Status da campanha',
    })
    @IsEnum(CampaignStatus)
    status: CampaignStatus;
}