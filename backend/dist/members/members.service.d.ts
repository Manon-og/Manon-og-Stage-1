import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMembersDto } from './dto/create-members.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { GetMemberDto } from './dto/get-members.dto';
export declare class MembersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createMembersDto: CreateMembersDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.MembersTypeEnum;
        deletedAt: Date | null;
    }>;
    findAll(getMemberDto: GetMemberDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.MembersTypeEnum;
        deletedAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.MembersTypeEnum;
        deletedAt: Date | null;
    }>;
    update(id: string, updateMembersDto: UpdateMembersDto): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.MembersTypeEnum;
        deletedAt: Date | null;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.MembersTypeEnum;
        deletedAt: Date | null;
    }>;
}
