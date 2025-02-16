import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberProjectDto } from './create-member_project.dto';

export class UpdateMemberProjectDto extends PartialType(
  CreateMemberProjectDto,
) {}
