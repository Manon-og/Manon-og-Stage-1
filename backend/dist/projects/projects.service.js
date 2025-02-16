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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProjectsDto) {
        try {
            const project = await this.prisma.projects.create({
                data: createProjectsDto,
            });
            if (!project) {
                throw new Error('Project not created');
            }
            return project;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll(getProjectDto) {
        try {
            const { search, page = '1', limit = '10' } = getProjectDto;
            const pageNumber = Number(page);
            const limitNumber = Number(limit);
            const allProjects = await this.prisma.projects.findMany({
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
            if (!allProjects || allProjects.length === 0) {
                throw new Error('No projects found');
            }
            return allProjects;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAllMembers(id) {
        try {
            const employees = await this.prisma.members_projects.findMany({
                where: {
                    projectId: id,
                },
            });
            return employees;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const project = this.prisma.projects.findUnique({
                where: {
                    id,
                },
            });
            if (!project) {
                throw new Error('Project not found');
            }
            return project;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateProjectsDto) {
        try {
            const project = await this.findOne(id);
            if (!project) {
                throw new Error('Member not found');
            }
            const updatedMember = await this.prisma.projects.update({
                where: {
                    id,
                },
                data: updateProjectsDto,
            });
            return updatedMember;
        }
        catch (error) {
            throw new common_1.HttpException(`An error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const project = this.findOne(id);
            if (!project) {
                throw new Error('Project not found');
            }
            const deletedUser = await this.prisma.projects.delete({
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
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map