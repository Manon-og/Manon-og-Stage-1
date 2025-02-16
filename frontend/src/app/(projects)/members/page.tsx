"use client";

import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";
import { members } from "@/lib/types/models";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ColumnDef } from "@tanstack/react-table";
// import { ClientColumns } from "@/components/columns/client-columns";
import { useGetAllMembers } from "@/lib/client/queries/memberQueries";
import {
  useUpdateMember,
  useCreateMember,
  useDeleteMember,
} from "@/lib/client/mutations/memberMutations";
import { CreateMemberDTO } from "@/lib/client/zod-schema/memberSchema";
import DeleteModal from "@/components/delete-modal";
import { MemberModals } from "@/lib/constant/member-modals";
import { MemberColumns } from "@/components/columns/member-columns";
import { MemberModal } from "@/components/member-modals";
import HeaderTitle from "@/components/header-title";
import { PlusIcon } from "lucide-react";
import { useGetAllMemberProjects } from "@/lib/client/queries/memberProjectQueries";
import { GetAllMembersParams } from "@/lib/client/services/memberService";
import { debounce } from "lodash";

export default function UserPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({} as GetAllMembersParams);
  const [activeModal, setActiveModal] = useState<MemberModals | null>();
  const [page, setPage] = useState<number>(1);
  const [selectedMember, setSelectedMember] = useState<members>();

  useEffect(() => {
    if (!isOpen) {
      setActiveModal(null);
    }
  }, [isOpen]);

  const { data: member, refetch: refetchMembers } = useGetAllMembers(filter);
  const { data: projectMember } = useGetAllMemberProjects();

  const { mutate: createMember } = useCreateMember({
    onSuccess: () => {
      refetchMembers();
      toast.success("Member created successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: updateMember } = useUpdateMember({
    onSuccess: () => {
      refetchMembers();
      toast.success("Member updated successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: deleteMember } = useDeleteMember({
    onSuccess: () => {
      refetchMembers();
      toast.success("Member deleted successfully");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onAdd = () => {
    setActiveModal(MemberModals.AddMember);
    setIsOpen(true);
  };

  const onEdit = (member: members) => {
    setSelectedMember(member);
    setActiveModal(MemberModals.EditMember);
    setIsOpen(true);
  };

  const onDelete = (member: members) => {
    setSelectedMember(member);
    setActiveModal(MemberModals.DeleteMember);
    setIsOpen(true);
  };

  const handleCreateUser = (data: CreateMemberDTO) => {
    createMember({ memberData: data });
  };

  const handleEditUser = (data: Partial<CreateMemberDTO>) => {
    if (selectedMember) {
      updateMember({ id: selectedMember.id, memberData: data });
    }
  };

  const handleDeleteUser = () => {
    if (!selectedMember) return;
    const projectMemberIds = projectMember?.map(
      (pm: { memberId: string }) => pm.memberId
    );

    if (projectMemberIds.includes(selectedMember.id)) {
      toast.error("Cannot delete member: Member is assigned to a project.");
      setIsOpen(false);
      return;
    }
    deleteMember({ id: selectedMember.id });
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

  const columns: ColumnDef<members>[] = useMemo(
    () => MemberColumns({ onEdit, onDelete }),
    []
  );

  const modals = {
    [MemberModals.AddMember]: (
      <MemberModal
        onSubmit={handleCreateUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    ),
    [MemberModals.EditMember]: (
      <MemberModal
        onSubmit={handleEditUser}
        member={selectedMember}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    ),
    [MemberModals.DeleteMember]: (
      <DeleteModal
        onDelete={handleDeleteUser}
        onCancel={() => setIsOpen(false)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        titleText={"Are you sure you want to delete this member?"}
        descriptionContent={"This action cannot be undone."}
        triggerLabel={"Delete"}
      />
    ),
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <HeaderTitle title="Members">
          <Button onClick={() => onAdd()}>
            {" "}
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Members
          </Button>
        </HeaderTitle>
      </div>
      <div className="mx-4 h-screen">
        <DataTable
          columns={columns}
          data={member || []}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          searchFilter={handleSearchFilter}
          rowId={"id"}
        />
      </div>
      {activeModal && modals[activeModal]}
    </div>
  );
}
