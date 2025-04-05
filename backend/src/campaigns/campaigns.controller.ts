import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiUnauthorizedResponse,
    ApiNotFoundResponse,
    ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Campaign } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Campaigns')
@Controller('campaigns')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Token inválido ou ausente.' })
export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService) { }

    @Post()
    @ApiOperation({ summary: 'Criar nova campanha' })
    @ApiResponse({ status: 201, description: 'Campanha criada com sucesso.' })
    @ApiBadRequestResponse({ description: 'Dados inválidos para criação da campanha.' })
    create(@Body() dto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignsService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todas as campanhas' })
    @ApiResponse({ status: 200, description: 'Lista de campanhas retornada.' })
    findAll(): Promise<Campaign[]> {
        return this.campaignsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar campanha por ID' })
    @ApiResponse({ status: 200, description: 'Campanha encontrada.' })
    @ApiNotFoundResponse({ description: 'Campanha não encontrada.' })
    findOne(@Param('id') id: string): Promise<Campaign> {
        return this.campaignsService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar campanha por ID' })
    @ApiResponse({ status: 200, description: 'Campanha atualizada com sucesso.' })
    @ApiBadRequestResponse({ description: 'Dados inválidos para atualização.' })
    @ApiNotFoundResponse({ description: 'Campanha não encontrada para atualização.' })
    update(@Param('id') id: string, @Body() dto: CreateCampaignDto): Promise<Campaign> {
        return this.campaignsService.update(+id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Excluir campanha por ID' })
    @ApiResponse({ status: 200, description: 'Campanha removida com sucesso.' })
    @ApiNotFoundResponse({ description: 'Campanha não encontrada para exclusão.' })
    remove(@Param('id') id: string): Promise<Campaign> {
        return this.campaignsService.remove(+id);
    }
}