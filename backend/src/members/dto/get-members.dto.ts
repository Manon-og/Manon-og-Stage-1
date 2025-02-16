import { IsOptional, IsString } from 'class-validator';

export class GetMemberDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  page: string;

  @IsString()
  @IsOptional()
  limit: string;
}
