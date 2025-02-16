"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExtendedMemberProjects } from "@/lib/types/models";
import DataTableHeader from "@/components/ui/data-table-header";

type MemberColumnsProps = {
  onDelete: (memberProject: ExtendedMemberProjects) => void;
};

enum MemberProjectTableColumns {
  ProjectName = "Project Name",
  MemberRole = "Member Role",
  MemberName = "Member Name",
  Assigned_At = "Assigned At",
}

export const MemberProjectColumns = ({
  onDelete,
}: MemberColumnsProps): ColumnDef<ExtendedMemberProjects>[] => {
  return [
    {
      accessorKey: MemberProjectTableColumns.MemberName,
      header: () => (
        <DataTableHeader label={MemberProjectTableColumns.MemberName} />
      ),
      cell: ({ row }) => {
        const member_project = row.original;
        return <div className="font-medium">{member_project.memberName}</div>;
      },
    },
    {
      accessorKey: MemberProjectTableColumns.MemberRole,
      header: () => (
        <DataTableHeader label={MemberProjectTableColumns.MemberRole} />
      ),
      cell: ({ row }) => {
        const member_project = row.original;
        return <div className="font-medium">{member_project.memberRole}</div>;
      },
    },
    {
      accessorKey: MemberProjectTableColumns.Assigned_At,
      header: () => (
        <DataTableHeader label={MemberProjectTableColumns.Assigned_At} />
      ),
      cell: ({ row }) => {
        const member_project = row.original;
        return (
          <div className="font-medium">
            {member_project.assignedAt.toString()}
          </div>
        );
      },
    },

    {
      id: "actions",
      header: () => <DataTableHeader label="Actions" />,
      cell: ({ row }) => {
        const member = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0" variant={"ghost"}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(member)}>
                  <Trash />
                  <p className="ml-2">Remove Member</p>
                </DropdownMenuItem>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
