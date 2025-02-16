import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberProjectsService } from './member_projects.service';
import {
  CreateManyMemberProjectDto,
  CreateMemberProjectDto,
} from './dto/create-member_project.dto';

@Controller('member-projects')
export class MemberProjectsController {
  constructor(private readonly memberProjectsService: MemberProjectsService) {}

  @Post()
  create(@Body() createMemberProjectDto: CreateMemberProjectDto) {
    return this.memberProjectsService.create(createMemberProjectDto);
  }

  @Post('create-many')
  createMany(@Body() createManyMemberProjectDto: CreateManyMemberProjectDto) {
    return this.memberProjectsService.createMany(createManyMemberProjectDto);
  }

  @Get()
  findAll() {
    return this.memberProjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.memberProjectsService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.memberProjectsService.delete(id);
  }
}
