"use client";
import { useQuery } from "@tanstack/react-query";
import {
  GetAllProjectParams,
  getAllProjects,
  getProjectById,
  getProjectMembersById,
} from "../services/projectService";

export const useGetAllProjects = (getProjectDto: GetAllProjectParams) => {
  return useQuery({
    queryKey: ["projects", { ...getProjectDto }],
    queryFn: () => getAllProjects(getProjectDto),
  });
};

export const useGetProjectById = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectById(id),
  });
};

export const useGetProjectMembersById = (id: string) => {
  return useQuery({
    queryKey: ["member-projects", id],
    queryFn: () => getProjectMembersById(id),
  });
};
