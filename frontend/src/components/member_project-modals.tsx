"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllMembers } from "@/lib/client/queries/memberQueries";
import DataTable from "./tabs-datatable";

interface Member {
  memberId: string;
}

interface MemberProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memberIds: string[]) => void;
  data: Member[];
}

export default function ModalWithTabs({
  onSubmit,
  onClose,
  isOpen,
  data,
}: MemberProjectModalProps) {
  const { data: member, refetch } = useGetAllMembers();
  const [selectedTab, setSelectedTab] = useState("backend");
  const [addedPeople, setAddedPeople] = useState<string[]>([]);

  console.log("ddd", member);
  console.log("asdas", data);
  const existingMember = data.map((member) => member.memberId);

  useEffect(() => {
    if (isOpen) {
      setSelectedTab("BACKEND");
      refetch();
    }
  }, [isOpen, refetch]);

  const filteredPeople =
    member?.filter((person: { role: string }) => person.role === selectedTab) ||
    [];

  const handleAdd = (id: string) => {
    setAddedPeople((prev) =>
      prev.includes(id)
        ? prev.filter((personId) => personId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onSubmit(addedPeople);
    console.log("Confirmed added people:", addedPeople);
    setAddedPeople([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="BACKEND" onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="BACKEND">Backend</TabsTrigger>
            <TabsTrigger value="FRONTEND">Frontend</TabsTrigger>
            <TabsTrigger value="UIUX">UI/UX</TabsTrigger>
          </TabsList>
          <TabsContent value="BACKEND">
            <DataTable
              people={filteredPeople}
              addedPeople={addedPeople}
              onAdd={handleAdd}
              existingIds={existingMember}
            />
          </TabsContent>
          <TabsContent value="FRONTEND">
            <DataTable
              people={filteredPeople}
              addedPeople={addedPeople}
              onAdd={handleAdd}
              existingIds={existingMember}
            />
          </TabsContent>
          <TabsContent value="UIUX">
            <DataTable
              people={filteredPeople}
              addedPeople={addedPeople}
              onAdd={handleAdd}
              existingIds={existingMember}
            />
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button onClick={handleConfirm} className="mt-4">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
