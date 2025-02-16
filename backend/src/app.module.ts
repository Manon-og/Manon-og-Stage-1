import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { MembersModule } from './members/members.module';
import { PrismaModule } from './prisma/prisma.module';
import { MemberProjectsModule } from './member_projects/member_projects.module';

@Module({
  imports: [ProjectsModule, MembersModule, PrismaModule, MemberProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
