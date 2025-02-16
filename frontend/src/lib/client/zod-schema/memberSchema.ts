import { MembersTypeEnum } from "@/lib/types/models";
import { z } from "zod";

export const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.nativeEnum(MembersTypeEnum),
});

export type CreateMemberDTO = z.infer<typeof memberSchema>;
