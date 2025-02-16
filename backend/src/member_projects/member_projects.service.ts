import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateManyMemberProjectDto,
  CreateMemberProjectDto,
} from './dto/create-member_project.dto';
import { UpdateMemberProjectDto } from './dto/update-member_project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MemberProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(createMemberProjectDto: CreateManyMemberProjectDto) {
    try {
      const { members } = createMemberProjectDto;

      const newMemberProject = await this.prisma.members_projects.createMany({
        data: members,
      });

      if (!newMemberProject) {
        throw new Error('Member not assigned');
      }

      return newMemberProject;
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createMemberProjectDto: CreateMemberProjectDto) {
    try {
      const member_project = await this.prisma.members_projects.create({
        data: createMemberProjectDto,
      });

      if (!member_project) {
        throw new Error('Member not assigned');
      }

      return member_project;
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      const member_project = await this.prisma.members_projects.findMany({});

      return member_project;
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
