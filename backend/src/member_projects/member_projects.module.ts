import { Module } from '@nestjs/common';
import { MemberProjectsService } from './member_projects.service';
import { MemberProjectsController } from './member_projects.controller';

@Module({
  controllers: [MemberProjectsController],
  providers: [MemberProjectsService],
})
export class MemberProjectsModule {}
