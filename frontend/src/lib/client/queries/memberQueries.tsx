"use client";
import { useQuery } from "@tanstack/react-query";
import {
  getAllMembers,
  GetAllMembersParams,
  getMemberById,
} from "../services/memberService";

export const useGetAllMembers = (getMemberDto: GetAllMembersParams) => {
  return useQuery({
    queryKey: ["members", { ...getMemberDto }],
    queryFn: () => getAllMembers(getMemberDto),
  });
};

export const useGetMemberById = (id: string) => {
  return useQuery({
    queryKey: ["members", id],
    queryFn: () => getMemberById(id),
  });
};
