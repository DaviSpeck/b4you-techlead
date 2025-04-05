import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CampaignsModule } from './campaigns/campaigns.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          limit: 10,
          ttl: 60_000
        },
      ],
      generateKey: (context, _tracker, throttlerName) => {
        const req = context.switchToHttp().getRequest();
        const ip =
          req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip;
        return `${throttlerName}:${ip}`;
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        if (!config.JWT_SECRET || !config.JWT_REFRESH_SECRET) {
          throw new Error('JWT secrets are missing in .env');
        }
        return config;
      },
    }),

    HealthModule,
    PrismaModule,
    UsersModule,
    AuthModule,
    CampaignsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})

export class AppModule { }