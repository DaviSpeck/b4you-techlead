import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwt: JwtService,
        private prisma: PrismaService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Usuário não encontrado');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Senha inválida');

        return user;
    }

    async login(dto: AuthDto) {
        const user = await this.validateUser(dto.email, dto.password);

        const payload = { sub: user.id, email: user.email };

        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
        });

        const refreshToken = await this.jwt.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        const hashedRefresh = await bcrypt.hash(refreshToken, 10);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedRefresh },
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshTokens(dto: RefreshTokenDto) {
        const { refreshToken } = dto;

        try {
            const payload = await this.jwt.verifyAsync(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findOne(payload.sub);
            if (!user || !user.refreshToken) throw new UnauthorizedException();

            const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
            if (!isMatch) throw new UnauthorizedException();

            const newPayload = { sub: user.id, email: user.email };

            const newAccessToken = await this.jwt.signAsync(newPayload, {
                expiresIn: '15m',
            });

            const newRefreshToken = await this.jwt.signAsync(newPayload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            });

            const hashedRefresh = await bcrypt.hash(newRefreshToken, 10);

            await this.prisma.user.update({
                where: { id: user.id },
                data: { refreshToken: hashedRefresh },
            });

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (err) {
            throw new UnauthorizedException('Refresh token inválido ou expirado');
        }
    }

    async changePassword(userId: number, dto: ChangePasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        if (!user) throw new UnauthorizedException('Usuário não encontrado');

        const valid = await bcrypt.compare(dto.currentPassword, user.password);
        if (!valid) throw new UnauthorizedException('Senha atual incorreta');

        const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedNewPassword },
        });

        return { message: 'Senha atualizada com sucesso.' };
    }

    async getUserFromToken(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            },
        })

        return user
    }

}