
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "name" | "learning_curve" | "strategic_depth" | "replayability" | "playtime";

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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex items-center gap-0" onClick={handleClick}>
      <button
        type="button"
        aria-label="Toggle sort direction"
        onClick={onDirectionToggle}
        className="h-10 px-2 rounded-r-none border border-input bg-background hover:bg-accent hover:text-accent-foreground flex items-center justify-center"
        style={{ borderRight: 0 }}
      >
        {sortDirection === "asc" ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
      </button>
      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger
          className="w-[180px] rounded-l-none border-l-0"
          hideChevron
        >
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="learning_curve">Learning Curve</SelectItem>
          <SelectItem value="strategic_depth">Strategic Depth</SelectItem>
          <SelectItem value="replayability">Replayability</SelectItem>
          <SelectItem value="playtime">Playtime</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
