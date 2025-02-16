"use client";

import {
  useCreateProject,
  useDeleteProject,
  useUpdateProject,
} from "@/lib/client/mutations/projectMutations";
import { useGetAllProjects } from "@/lib/client/queries/projectQueries";

import { CreateProjectDTO } from "@/lib/client/zod-schema/projectSchema";
import { ProjectModals } from "@/lib/constant/project-modals";
import { projects } from "@/lib/types/models";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import DataTable from "@/components/ui/data-table";
import HeaderTitle from "@/components/header-title";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import DeleteModal from "@/components/delete-modal";
import { ProjectModal } from "@/components/project-modal";
import { ProjectColumns } from "@/components/columns/project-columns";
import { ColumnDef } from "@tanstack/react-table";
import { debounce } from "lodash";
import { GetAllProjectParams } from "@/lib/client/services/projectService";
import { useGetAllMemberProjects } from "@/lib/client/queries/memberProjectQueries";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({} as GetAllProjectParams);
  const [activeModal, setActiveModal] = useState<ProjectModals | null>();
  const [page, setPage] = useState<number>(1);
  const [selectedProject, setSelectedProject] = useState<projects>();

  useEffect(() => {
    if (!isModalOpen) {
      setActiveModal(null);
    }
  }, [isModalOpen]);

  const { data: projects, refetch: refetchProjects } =
    useGetAllProjects(filter);
  const { data: projectMember } = useGetAllMemberProjects();

  const { mutate: createProject } = useCreateProject({
    onSuccess: () => {
      refetchProjects();
      toast.success("Project created successfully");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateProject } = useUpdateProject({
    onSuccess: () => {
      refetchProjects();
      toast.success("Project updated successfully");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteProject } = useDeleteProject({
    onSuccess: () => {
      refetchProjects();
      toast.success("Project deleted successfully");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onEdit = (project: projects) => {
    setSelectedProject(project);
    setActiveModal(ProjectModals.EditProject);
    setIsModalOpen(true);
  };

  const onDelete = (project: projects) => {
    setSelectedProject(project);
    setActiveModal(ProjectModals.DeleteProject);
    setIsModalOpen(true);
  };

  const handleCreateProject = (data: CreateProjectDTO) => {
    createProject({ projectData: data });
  };

  const handleUpdateProject = (data: Partial<CreateProjectDTO>) => {
    if (selectedProject) {
      updateProject({ id: selectedProject.id, projectData: data });
    }
  };

  const handleDeleteProject = () => {
    if (!selectedProject) return;
    const projectMemberIds = projectMember?.map(
      (pm: { projectId: string }) => pm.projectId
    );

    if (projectMemberIds.includes(selectedProject.id)) {
      toast.error(
        "Cannot delete project: This project still has assigned members."
      );
      setIsModalOpen(false);
      return;
    }
    deleteProject({ id: selectedProject.id });
  };

  const defaultDebounceDelay = 300;

  const handleSearchFilter = debounce((value: string) => {
    setFilter((prev) => ({ ...prev, search: value }));
  }, defaultDebounceDelay);

  const handlePrevPage = () => {
    setFilter((prev) => ({ ...prev, page: page - 1 }));
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setFilter((prev) => ({ ...prev, page: page + 1 }));
    setPage(page + 1);
  };

  const columns: ColumnDef<projects>[] = useMemo(
    () => ProjectColumns({ onEdit, onDelete }),
    []
  );

  const modals = {
    [ProjectModals.DeleteProject]: (
      <DeleteModal
        onDelete={handleDeleteProject}
        onCancel={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        titleText={"Are you sure you want to delete this project?"}
        descriptionContent={"This action cannot be undone."}
        triggerLabel={"Delete"}
      />
    ),
    [ProjectModals.EditProject]: (
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateProject}
        initialData={selectedProject}
      />
    ),
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <HeaderTitle title="Projects">
          <Button
            onClick={() => {
              setActiveModal(null);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </HeaderTitle>

        {!activeModal && (
          <ProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleCreateProject}
          />
        )}

        <div>
          <DataTable
            columns={columns}
            data={projects || []}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            searchFilter={handleSearchFilter}
            rowId={"id"}
          />
        </div>
      </div>
      {activeModal && modals[activeModal]}
    </div>
  );
};

export default Page;
