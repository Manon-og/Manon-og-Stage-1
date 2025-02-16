"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, EyeIcon, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projects } from "@/lib/types/models";
import DataTableHeader from "@/components/ui/data-table-header";
import { useRouter } from "next/navigation";

type ProjectColumnsProps = {
  onEdit: (project: projects) => void;
  onDelete: (project: projects) => void;
};

enum ProjectTableColumns {
  ProjectName = "Project Name",
  Description = "Description",
}

export const ProjectColumns = ({
  onEdit,
  onDelete,
}: ProjectColumnsProps): ColumnDef<projects>[] => {
  const router = useRouter();

  return [
    {
      accessorKey: ProjectTableColumns.ProjectName,
      header: () => <DataTableHeader label={ProjectTableColumns.ProjectName} />,
      cell: ({ row }) => {
        const project = row.original;
        return <div className="font-medium">{project.name}</div>;
      },
    },
    {
      accessorKey: ProjectTableColumns.Description,
      header: () => <DataTableHeader label={ProjectTableColumns.Description} />,
      cell: ({ row }) => {
        const project = row.original;
        return <div className="font-medium">{project.description}</div>;
      },
    },

    {
      id: "actions",
      header: () => <DataTableHeader label="Actions" />,
      cell: ({ row }) => {
        const project = row.original;

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
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/projects/${project.id}/members`);
                }}
              >
                <EyeIcon />
                <p className="ml-2">View Project</p>
              </DropdownMenuItem>

              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onEdit(project)}>
                  <Edit />
                  <p className="ml-2">Edit Project</p>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(project)}>
                  <Trash />
                  <p className="ml-2">Delete Project</p>
                </DropdownMenuItem>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
