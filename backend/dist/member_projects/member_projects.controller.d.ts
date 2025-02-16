import { MemberProjectsService } from './member_projects.service';
import { CreateManyMemberProjectDto, CreateMemberProjectDto } from './dto/create-member_project.dto';
export declare class MemberProjectsController {
    private readonly memberProjectsService;
    constructor(memberProjectsService: MemberProjectsService);
    create(createMemberProjectDto: CreateMemberProjectDto): Promise<{
        id: string;
        projectId: string;
        memberId: string;
        assignedAt: Date;
    }>;
    createMany(createManyMemberProjectDto: CreateManyMemberProjectDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
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
