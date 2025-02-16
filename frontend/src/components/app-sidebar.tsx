"use client";

import * as React from "react";
import { Users, Briefcase, ArrowBigUpIcon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

import { Links } from "@/lib/links";
import { NavUser } from "./nav-user";
import { NavSections } from "./nav-section";

const data = {
  user: {
    name: "James Manon-og",
    email: "jamanon-og@addu.edu.ph",
    avatar: "",
    role: "Engineer",
  },
  projects: [
    {
      name: "Projects",
      url: Links.projects,
      icon: Briefcase,
    },
    {
      name: "Members",
      url: Links.members,
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <ArrowBigUpIcon className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Sys-Dev</span>
            <span className="truncate text-xs">project management</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <NavSections sectionName="Projects" projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
