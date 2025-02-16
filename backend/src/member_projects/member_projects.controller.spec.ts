import { Test, TestingModule } from '@nestjs/testing';
import { MemberProjectsController } from './member_projects.controller';
import { MemberProjectsService } from './member_projects.service';

describe('MemberProjectsController', () => {
  let controller: MemberProjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MemberProjectsController],
      providers: [MemberProjectsService],
    }).compile();

    controller = module.get<MemberProjectsController>(MemberProjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
