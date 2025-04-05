import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Campaign, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CampaignsService {
    constructor(private prisma: PrismaService) { }

    create(data: Prisma.CampaignCreateInput): Promise<Campaign> {
        return this.prisma.campaign.create({ data });
    }

    findAll(): Promise<Campaign[]> {
        return this.prisma.campaign.findMany();
    }

    async findOne(id: number): Promise<Campaign> {
        const campaign = await this.prisma.campaign.findUnique({ where: { id } });
        if (!campaign) {
            throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
        }
        return campaign;
    }

    async update(id: number, data: Prisma.CampaignUpdateInput): Promise<Campaign> {
        try {
            return await this.prisma.campaign.update({ where: { id }, data });
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
            }
            throw error;
        }
    }

    async remove(id: number): Promise<Campaign> {
        try {
            return await this.prisma.campaign.delete({ where: { id } });
        } catch (error) {
            if (
                error instanceof PrismaClientKnownRequestError &&
                error.code === 'P2025'
            ) {
                throw new NotFoundException(`Campanha com ID ${id} não encontrada`);
            }
            throw error;
        }
    }
}