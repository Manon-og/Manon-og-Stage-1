import { BASE_URL } from "@/lib/config";

const MEMBER_PROJECTS_URI = "/member-projects";
const CREATE_MANY_URI = "/create-many";

export const getAllMemberProject = async () => {
  const data = await fetch(`${BASE_URL}${MEMBER_PROJECTS_URI}`);
  const response = await data.json();
  return response;
};

export const getMemberProjectById = async (id: string) => {
  const data = await fetch(`${BASE_URL}${MEMBER_PROJECTS_URI}/${id}`);
  const response = await data.json();
  return response;
};

export const createMemberProject = async (memberProjectData: unknown) => {
  const data = await fetch(`${BASE_URL}${MEMBER_PROJECTS_URI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberProjectData),
  });
  const response = await data.json();
  return response;
};

export const createManyMemberProject = async (memberProjectData: unknown) => {
  const data = await fetch(
    `${BASE_URL}${MEMBER_PROJECTS_URI}${CREATE_MANY_URI}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberProjectData),
    }
  );
  const response = await data.json();
  return response;
};

export const deleteMemberProject = async (id: string) => {
  const data = await fetch(`${BASE_URL}${MEMBER_PROJECTS_URI}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
