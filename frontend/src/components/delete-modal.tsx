import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onDelete: () => void;
  onCancel: () => void;
  titleText: string;
  descriptionContent: string;
  triggerLabel?: string;
};

const DeleteModal = ({
  isOpen,
  setIsOpen,
  onDelete,
  onCancel,
  titleText,
  descriptionContent,
  triggerLabel,
}: DeleteModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-sm bg-white">
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="flex flex-col items-center justify-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-300">
              <Trash2 color="red" size={30} />
            </div>
            {titleText}
          </DialogTitle>
          <DialogDescription className="w-80 pt-2 text-center text-zinc-500">
            {descriptionContent}
          </DialogDescription>
        </DialogHeader>
        <div className='border-2" mt-2 flex items-center justify-center gap-2'>
          <Button
            className="rounded-lg border border-zinc-300 px-8"
            size="lg"
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="rounded-lg bg-red-600 px-8 text-white"
            size="lg"
            type="button"
            onClick={onDelete}
          >
            {triggerLabel ?? "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
