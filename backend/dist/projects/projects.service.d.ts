import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDto } from './dto/update-projects.dto';
import { GetProjectDto } from './dto/get-projects.dto';
export declare class ProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProjectsDto: CreateProjectsDto): Promise<{
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(getProjectDto: GetProjectDto): Promise<{
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAllMembers(id: string): Promise<{
        id: string;
        projectId: string;
        memberId: string;
        assignedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateProjectsDto: UpdateProjectsDto): Promise<{
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
