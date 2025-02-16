import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMembersDto } from './dto/create-members.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { GetMemberDto } from './dto/get-members.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  create(@Body() createMembersDto: CreateMembersDto) {
    return this.membersService.create(createMembersDto);
  }

  @Get()
  findAll(@Query() getMemberDto: GetMemberDto) {
    return this.membersService.findAll(getMemberDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.membersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMembersDto: UpdateMembersDto) {
    return this.membersService.update(id, updateMembersDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.membersService.delete(id);
  }
}
