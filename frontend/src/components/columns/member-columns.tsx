"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { members } from "@/lib/types/models";
import DataTableHeader from "@/components/ui/data-table-header";

type MemberColumnsProps = {
  onEdit: (Member: members) => void;
  onDelete: (Member: members) => void;
};

enum MemberTableColumns {
  MemberName = "Member Name",
  Role = "Role",
}

export const MemberColumns = ({
  onEdit,
  onDelete,
}: MemberColumnsProps): ColumnDef<members>[] => {
  return [
    {
      accessorKey: MemberTableColumns.MemberName,
      header: () => <DataTableHeader label={MemberTableColumns.MemberName} />,
      cell: ({ row }) => {
        const Member = row.original;
        return <div className="font-medium">{Member.name}</div>;
      },
    },
    {
      accessorKey: MemberTableColumns.Role,
      header: () => <DataTableHeader label={MemberTableColumns.Role} />,
      cell: ({ row }) => {
        const member = row.original;
        return <div className="font-medium">{member.role}</div>;
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

                <DropdownMenuItem onClick={() => onEdit(member)}>
                  <Edit />
                  <p className="ml-2">Edit Member</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(member)}>
                  <Trash />
                  <p className="ml-2">Delete Member</p>
                </DropdownMenuItem>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
