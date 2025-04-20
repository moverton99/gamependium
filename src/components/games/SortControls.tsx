
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "name" | "learning_curve" | "strategic_depth" | "replayability";

interface SortControlsProps {
  sortBy: SortOption;
  sortDirection: "asc" | "desc";
  onSortChange: (value: SortOption) => void;
  onDirectionToggle: () => void;
}

export const SortControls = ({
  sortBy,
  sortDirection,
  onSortChange,
  onDirectionToggle,
}: SortControlsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="learning_curve">Learning Curve</SelectItem>
          <SelectItem value="strategic_depth">Strategic Depth</SelectItem>
          <SelectItem value="replayability">Replayability</SelectItem>
        </SelectContent>
      </Select>
      <Button
        variant="outline"
        size="icon"
        onClick={onDirectionToggle}
        className="flex items-center justify-center w-10 h-10"
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
