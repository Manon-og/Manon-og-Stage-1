import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  createManyMemberProject,
  createMemberProject,
  deleteMemberProject,
} from "../services/member_projectService";

export const useCreateMemberProject = (
  mutationOptions: UseMutationOptions<
    unknown,
    Error,
    { memberProjectData: unknown }
  >
) =>
  useMutation({
    mutationFn: ({ memberProjectData }) =>
      createMemberProject(memberProjectData),
    ...mutationOptions,
  });

export const useCreateManyMemberProject = (
  mutationOptions: UseMutationOptions<
    unknown,
    Error,
    {
      members: {
        projectId: string;
        memberId: string;
      }[];
    }
  >
) =>
  useMutation({
    mutationFn: (data) => createManyMemberProject(data),
    ...mutationOptions,
  });

export const useDeletMemberProjecte = (
  mutationOptions: UseMutationOptions<unknown, Error, { id: string }>
) =>
  useMutation({
    mutationFn: ({ id }) => deleteMemberProject(id),
    ...mutationOptions,
  });
