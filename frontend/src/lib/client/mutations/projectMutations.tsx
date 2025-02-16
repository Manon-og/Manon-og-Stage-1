import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  updateProject,
} from "../services/projectService";

export const useCreateProject = (
  mutationOptions: UseMutationOptions<unknown, Error, { projectData: unknown }>
) =>
  useMutation({
    mutationFn: ({ projectData }) => createProject(projectData),
    ...mutationOptions,
  });

export const useUpdateProject = (
  mutationOptions: UseMutationOptions<
    unknown,
    Error,
    { id: string; projectData: unknown }
  >
) =>
  useMutation({
    mutationFn: ({ id, projectData }) => updateProject(id, projectData),
    ...mutationOptions,
  });

export const useDeleteProject = (
  mutationOptions: UseMutationOptions<unknown, Error, { id: string }>
) =>
  useMutation({
    mutationFn: ({ id }) => deleteProject(id),
    ...mutationOptions,
  });
