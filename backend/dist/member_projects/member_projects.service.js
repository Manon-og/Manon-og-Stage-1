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
exports.MemberProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MemberProjectsService = class MemberProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMany(createMemberProjectDto) {
        try {
            const { members } = createMemberProjectDto;
            const newMemberProject = await this.prisma.members_projects.createMany({
                data: members,
            });
            if (!newMemberProject) {
                throw new Error('Member not assigned');
            }
            return newMemberProject;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(createMemberProjectDto) {
        try {
            const member_project = await this.prisma.members_projects.create({
                data: createMemberProjectDto,
            });
            if (!member_project) {
                throw new Error('Member not assigned');
            }
            return member_project;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            const member_project = await this.prisma.members_projects.findMany({});
            return member_project;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const member_project = await this.prisma.members_projects.findUnique({
                where: {
                    id,
                },
            });
            if (!member_project) {
                throw new Error('Member not found');
            }
            return member_project;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const member_project = this.findOne(id);
            if (!member_project) {
                throw new Error('Member not found');
            }
            const deletedUser = await this.prisma.members_projects.delete({
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
exports.MemberProjectsService = MemberProjectsService;
exports.MemberProjectsService = MemberProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MemberProjectsService);
//# sourceMappingURL=member_projects.service.js.map