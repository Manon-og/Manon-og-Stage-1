"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MembersService = class MembersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMembersDto) {
        try {
            const member = await this.prisma.members.create({
                data: createMembersDto,
            });
            if (!member) {
                throw new Error('Member not created');
            }
            return member;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(getMemberDto) {
        try {
            const { search, page = '1', limit = '10' } = getMemberDto;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);
            const allMembers = await this.prisma.members.findMany({
                where: {
                    ...(search
                        ? {
                            OR: [{ name: { contains: search, mode: 'insensitive' } }],
                        }
                        : {}),
                },
                skip: (pageNumber - 1) * limitNumber,
                take: limitNumber,
            });
            if (!allMembers || allMembers.length === 0) {
                throw new Error('No members found');
            }
            return allMembers;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const member = this.prisma.members.findUnique({
                where: {
                    id,
                },
            });
            if (!member) {
                throw new Error('Member not found');
            }
            return member;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateMembersDto) {
        try {
            const member = await this.findOne(id);
            if (!member) {
                throw new Error('Member not found');
            }
            const updatedMember = await this.prisma.members.update({
                where: {
                    id,
                },
                data: updateMembersDto,
            });
            return updatedMember;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const member = this.findOne(id);
            if (!member) {
                throw new Error('Member not found');
            }
            const deletedUser = await this.prisma.members.delete({
                where: {
                    id,
                },
            });
            return deletedUser;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembersService);
//# sourceMappingURL=members.service.js.map