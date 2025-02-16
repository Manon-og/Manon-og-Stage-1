"use client";

import { ExtendedMemberProjects, members_projects } from "@/lib/types/models";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import HeaderTitle from "@/components/header-title";
import { ColumnDef } from "@tanstack/react-table";
import { MemberProjectModals } from "@/lib/constant/member_project-modals";
import {
  useCreateManyMemberProject,
  useDeletMemberProjecte,
} from "@/lib/client/mutations/member_projectMutations";
import { useGetAllMembers } from "@/lib/client/queries/memberQueries";
import { MemberProjectColumns } from "@/components/columns/member_project-columns";
import DeleteModal from "@/components/delete-modal";
import { useGetAllMemberProjects } from "@/lib/client/queries/memberProjectQueries";
import { useParams } from "next/navigation";
import {
  useGetProjectById,
  useGetProjectMembersById,
} from "@/lib/client/queries/projectQueries";
import ModalWithTabs from "@/components/member_project-modals";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { GetAllMembersParams } from "@/lib/client/services/memberService";
import OnbourdingDataTable from "@/components/onbourding-datatable";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter] = useState({} as GetAllMembersParams);
  const [activeModal, setActiveModal] = useState<MemberProjectModals | null>();
  const [selectedProject, setSelectedProject] = useState<members_projects>();

  useEffect(() => {
    if (!isModalOpen) {
      setActiveModal(null);
    }
  }, [isModalOpen]);
  const params = useParams();
  const id = params.id as string;

  const { data: members, refetch: refetchMembers } = useGetAllMembers(filter);
  const { data: projectName } = useGetProjectById(id);

  const { data: projectMembers } = useGetProjectMembersById(id);
  console.log("IM HERE", id);
  console.log("project members", projectMembers);

  const projName = projectName?.name ?? "Untitled Project";
  const { data: member_project, refetch: refetchMemberProjects } =
    useGetAllMemberProjects();

  const memberMap = useMemo(() => {
    if (!members) return new Map();
    return new Map(
      members.map((member: { id: string; name: string; role: string }) => [
        member.id,
        { name: member.name, role: member.role },
      ])
    );
  }, [members]);

  const filteredMemberProjects = useMemo(() => {
    return (
      member_project
        ?.filter((project: { projectId: string }) => project.projectId === id)
        .map((project: { memberId: string }) => {
          const member = memberMap.get(project.memberId) || {
            name: "Unknown",
            role: "Unknown",
          };
          return {
            ...project,
            memberName: member.name,
            memberRole: member.role,
          };
        }) || []
    );
  }, [member_project, memberMap, id]);

  console.log("hellow???", filteredMemberProjects);

  console.log("here", member_project);
  const { mutate: createManyMemberProject } = useCreateManyMemberProject({
    onSuccess: () => {
      toast.success("Members added successfully");
      setIsModalOpen(false);
      refetchMemberProjects();
    },
    onError: (error) => toast.error(`Error adding Members: ${error.message}`),
  });

  const { mutate: deleteMemberProject } = useDeletMemberProjecte({
    onSuccess: () => {
      toast.success("Members removed successfully");
      setIsModalOpen(false);
      refetchMemberProjects();
    },
    onError: (error) => toast.error(`Error removing Members: ${error.message}`),
  });

  const onDelete = (member_project: members_projects) => {
    refetchMembers();
    setSelectedProject(member_project);
    setActiveModal(MemberProjectModals.DeleteMemberProject);
    setIsModalOpen(true);
  };

  const handleCreateMemberProject = (memberIds: string[]) => {
    const formattedMembers = memberIds.map((memberId) => ({
      projectId: id,
      memberId,
    }));
    createManyMemberProject({ members: formattedMembers });
    refetchMembers();
    refetchMemberProjects();
  };

  const handleDeleteMemberProject = () => {
    if (selectedProject) {
      refetchMembers();
      deleteMemberProject({ id: selectedProject.id });
      refetchMembers();
      refetchMemberProjects();
    }
  };

  const columns: ColumnDef<ExtendedMemberProjects>[] = useMemo(
    () => MemberProjectColumns({ onDelete }),
    []
  );

  const modals = {
    [MemberProjectModals.DeleteMemberProject]: (
      <DeleteModal
        onDelete={handleDeleteMemberProject}
        onCancel={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        titleText={"Are you sure you want to remove this member?"}
        descriptionContent={"This action cannot be undone."}
        triggerLabel={"Delete"}
      />
    ),
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <HeaderTitle title={projName}>
          <Button
            onClick={() => {
              setActiveModal(null);
              setIsModalOpen(true);
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Assign Members
          </Button>
        </HeaderTitle>

        {!activeModal && (
          <ModalWithTabs
            onSubmit={handleCreateMemberProject}
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            data={filteredMemberProjects}
          />
        )}
        <div>
          <OnbourdingDataTable
            columns={columns}
            data={filteredMemberProjects || []}
            rowId={"id"}
          />
        </div>
      </div>
      {activeModal && modals[activeModal]}
    </div>
  );
};

export default Page;
