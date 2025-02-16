import { CreateManyMemberProjectDto, CreateMemberProjectDto } from './dto/create-member_project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class MemberProjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createMany(createMemberProjectDto: CreateManyMemberProjectDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    create(createMemberProjectDto: CreateMemberProjectDto): Promise<{
        id: string;
        projectId: string;
        memberId: string;
        assignedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        projectId: string;
        memberId: string;
        assignedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        projectId: string;
        memberId: string;
        assignedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        projectId: string;
        memberId: string;
        assignedAt: Date;
    }>;
}
