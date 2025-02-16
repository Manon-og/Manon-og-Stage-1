export enum MembersTypeEnum {
  BACKEND = "BACKEND",
  FRONTEND = "FRONTEND",
  UIUX = "UIUX",
}

export type members = {
  id: string;
  name: string;
  role: MembersTypeEnum;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  projects: members_projects[];
};

export type projects = {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  members: members_projects[];
};

export type members_projects = {
  id: string;
  projectId: string;
  project: projects;
  memberId: string;
  member: members;
  assignedAt: Date;
};

export type ExtendedMemberProjects = members_projects & {
  memberName: string;
  memberRole: string;
};
