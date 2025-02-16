import { Type } from 'class-transformer';
import { IsString, IsDate, ValidateNested } from 'class-validator';

export class CreateMemberProjectDto {
  @IsString()
  projectId: string;

  @IsString()
  memberId: string;
}

export class CreateManyMemberProjectDto {
  @ValidateNested({ each: true })
  @Type(() => CreateMemberProjectDto)
  members: CreateMemberProjectDto[];
}
