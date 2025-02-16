import { BASE_URL } from "@/lib/config";

const PROJECTS_URI = "/projects";
const MEMBERS_URI = "/members";
export interface GetAllProjectParams {
  search?: string;
  page?: number;
  limit?: number;
}

export const getAllProjects = async (params?: Partial<GetAllProjectParams>) => {
  const url = new URL(`${BASE_URL}${PROJECTS_URI}`);

  if (params) {
    Object.entries(params ?? {})
      .filter(([, value]) => value != null)
      .forEach(([key, value]) => url.searchParams.append(key, String(value)));
  }

  const data = await fetch(url.toString());
  const response = await data.json();
  return response;
};

export const getProjectById = async (id: string) => {
  const data = await fetch(`${BASE_URL}${PROJECTS_URI}/${id}`);
  const response = await data.json();
  return response;
};

export const getProjectMembersById = async (id: string) => {
  const data = await fetch(`${BASE_URL}${PROJECTS_URI}/${id}${MEMBERS_URI}`);
  const response = await data.json();
  return response;
};

export const createProject = async (projectData: unknown) => {
  const data = await fetch(`${BASE_URL}${PROJECTS_URI}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  const response = await data.json();
  return response;
};

export const updateProject = async (id: string, projectData: unknown) => {
  const data = await fetch(`${BASE_URL}${PROJECTS_URI}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  const response = await data.json();
  return response;
};

export const deleteProject = async (id: string) => {
  const data = await fetch(`${BASE_URL}${PROJECTS_URI}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
