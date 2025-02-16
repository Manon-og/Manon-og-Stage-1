"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getAllMemberProject,
  getMemberProjectById,
} from "../services/member_projectService";

export const useGetAllMemberProjects = () => {
  return useQuery({
    queryKey: ["member-projects"],
    queryFn: () => getAllMemberProject(),
  });
};

export const useGetAllMemberProjectsById = (id: string) => {
  return useQuery({
    queryKey: ["member-projects", id],
    queryFn: () => getMemberProjectById(id),
  });
};
