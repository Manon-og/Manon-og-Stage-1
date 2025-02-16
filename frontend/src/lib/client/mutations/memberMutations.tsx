import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  createMember,
  deleteMember,
  updateMember,
} from "../services/memberService";

export const useCreateMember = (
  mutationOptions: UseMutationOptions<unknown, Error, { memberData: unknown }>
) =>
  useMutation({
    mutationFn: ({ memberData }) => createMember(memberData),
    ...mutationOptions,
  });

export const useUpdateMember = (
  mutationOptions: UseMutationOptions<
    unknown,
    Error,
    { id: string; memberData: unknown }
  >
) =>
  useMutation({
    mutationFn: ({ id, memberData }) => updateMember(id, memberData),
    ...mutationOptions,
  });

export const useDeleteMember = (
  mutationOptions: UseMutationOptions<unknown, Error, { id: string }>
) =>
  useMutation({
    mutationFn: ({ id }) => deleteMember(id),
    ...mutationOptions,
  });
