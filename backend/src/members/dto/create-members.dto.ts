import { MembersTypeEnum } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';

export class CreateMembersDto {
  @IsString()
  name: string;

  @IsEnum(MembersTypeEnum)
  role: MembersTypeEnum;
}
