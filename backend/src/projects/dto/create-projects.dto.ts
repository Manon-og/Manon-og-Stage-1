import { IsString } from 'class-validator';

export class CreateProjectsDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
