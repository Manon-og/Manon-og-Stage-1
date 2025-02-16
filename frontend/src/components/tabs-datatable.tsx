import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { members } from "@/lib/types/models";

interface DataTableProps {
  people: members[];
  addedPeople: string[];
  onAdd: (id: string) => void;
  existingIds: string[];
}

export default function DataTable({
  people,
  addedPeople,
  onAdd,
  existingIds,
}: DataTableProps) {
  console.log("existingIds", existingIds);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((person) => {
          console.log("PEOPLE ID", person.id);
          const isAdded =
            addedPeople.includes(person.id) || existingIds.includes(person.id);
          console.log("isADDED?", isAdded);

          return (
            <TableRow key={person.id}>
              <TableCell>{person.name}</TableCell>
              <TableCell className="relative text-right">
                <Button
                  size="sm"
                  onClick={() => onAdd(person.id)}
                  variant={isAdded ? "secondary" : "default"}
                  disabled={existingIds.includes(person.id)} // Prevent re-adding existing members
                  className="relative"
                >
                  {isAdded ? "Added" : "Add"}
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
