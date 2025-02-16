import { BASE_URL } from "@/lib/config";

const MEMBERS_URI = "/members";
export interface GetAllMembersParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const getAllMembers = async (params?: Partial<GetAllMembersParams>) => {
  const url = new URL(`${BASE_URL}${MEMBERS_URI}`);

  if (params) {
    Object.entries(params ?? {})
      .filter(([, value]) => value != null)
      .forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  const data = await fetch(url.toString());
  const response = await data.json();
  return response;
};

export const getMemberById = async (id: string) => {
  const data = await fetch(`${BASE_URL}${MEMBERS_URI}/${id}`);
  const response = await data.json();
  return response;
};

export const createMember = async (memberData: unknown) => {
  const data = await fetch(`${BASE_URL}${MEMBERS_URI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberData),
  });
  const response = await data.json();
  return response;
};

export const updateMember = async (id: string, memberData: unknown) => {
  const data = await fetch(`${BASE_URL}${MEMBERS_URI}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberData),
  });
  const response = await data.json();
  return response;
};

export const deleteMember = async (id: string) => {
  const data = await fetch(`${BASE_URL}${MEMBERS_URI}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
