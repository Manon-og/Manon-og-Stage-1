import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMembersDto } from './dto/create-members.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { GetMemberDto } from './dto/get-members.dto';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMembersDto: CreateMembersDto) {
    try {
      const member = await this.prisma.members.create({
        data: createMembersDto,
      });

      if (!member) {
        throw new Error('Member not created');
      }

      return member;
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(getMemberDto: GetMemberDto) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateMembersDto: UpdateMembersDto) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
