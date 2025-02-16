import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { UpdateProjectsDto } from './dto/update-projects.dto';
import { GetProjectDto } from './dto/get-projects.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProjectsDto: CreateProjectsDto) {
    try {
      const project = await this.prisma.projects.create({
        data: createProjectsDto,
      });

      if (!project) {
        throw new Error('Project not created');
      }

      return project;
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(getProjectDto: GetProjectDto) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllMembers(id: string) {
    try {
      const employees = await this.prisma.members_projects.findMany({
        where: {
          projectId: id,
        },
      });

      return employees;
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateProjectsDto: UpdateProjectsDto) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string) {
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
    } catch (error) {
      throw new HttpException(
        `An error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
