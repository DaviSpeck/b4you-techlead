import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiOperation({ summary: 'Criar novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
    @ApiBadRequestResponse({ description: 'Dados inválidos.' })
    create(@Body() dto: CreateUserDto): Promise<User> {
        return this.usersService.create(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Buscar todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
    @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente.' })
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('by-email')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Buscar usuário por e-mail' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
    @ApiBadRequestResponse({ description: 'E-mail não informado ou malformado.' })
    @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente.' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
    findByEmail(@Query('email') email: string): Promise<User> {
        return this.usersService.findByEmail(email);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Buscar usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
    @ApiBadRequestResponse({ description: 'ID inválido.' })
    @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente.' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(+id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Remover usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
    @ApiBadRequestResponse({ description: 'ID inválido.' })
    @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente.' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
    remove(@Param('id') id: string): Promise<User> {
        return this.usersService.remove(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Atualiza o nome do usuário' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
    @ApiBadRequestResponse({ description: 'Dados inválidos.' })
    @ApiUnauthorizedResponse({ description: 'Token inválido ou ausente.' })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
    update(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
        return this.usersService.update(+id, dto);
    }
}