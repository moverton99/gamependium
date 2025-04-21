
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
    <div className="flex flex-col w-[180px] relative" onClick={handleClick}>
      <Select
        value={sortBy}
        onValueChange={(value) => onSortChange(value as SortOption)}
      >
        <SelectTrigger className="w-full pr-12">
          <SelectValue placeholder="Sort by..." />
          <button
            type="button"
            aria-label="Toggle sort direction"
            onClick={(e) => {
              e.stopPropagation();
              onDirectionToggle();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-muted text-muted-foreground transition-colors"
            tabIndex={-1}
          >
            {sortDirection === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </button>
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

