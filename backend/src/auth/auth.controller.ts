import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOperation({ summary: 'Realiza login e retorna access/refresh tokens' })
    @ApiResponse({ status: 201, description: 'Tokens gerados com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Renova o accessToken usando o refreshToken' })
    @ApiResponse({ status: 201, description: 'Tokens renovados com sucesso' })
    @ApiUnauthorizedResponse({ description: 'Refresh token inválido ou expirado' })
    refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refreshTokens(dto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retorna dados do usuário autenticado' })
    @ApiResponse({ status: 200, description: 'Usuário autenticado' })
    @ApiUnauthorizedResponse({ description: 'Token ausente ou inválido' })
    getMe(@Request() req) {
        return req.user;
    }
}