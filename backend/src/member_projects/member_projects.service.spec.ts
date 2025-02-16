import { Test, TestingModule } from '@nestjs/testing';
import { MemberProjectsService } from './member_projects.service';

describe('MemberProjectsService', () => {
  let service: MemberProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberProjectsService],
    }).compile();

    service = module.get<MemberProjectsService>(MemberProjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
