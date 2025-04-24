
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
    <div
      className="flex items-center w-full md:w-64 max-w-full border border-gray-300 rounded-md bg-white/90 overflow-hidden"
      onClick={handleClick}
    >
      <button
        type="button"
        aria-label="Toggle sort direction"
        onClick={onDirectionToggle}
        className={cn(
          "w-10 h-10 flex items-center justify-center border-0 border-r border-gray-300 bg-transparent hover:bg-gray-100 transition-colors font-medium text-black", 
          "border-r border-gray-300 rounded-l-md"
        )}
        tabIndex={0}
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
          hideChevron
          className={cn(
            "flex-1 w-0 h-10 border-0 border-l border-gray-300 rounded-none focus:ring-0 transition-colors font-medium text-black bg-transparent",
            "rounded-r-md"
          )}
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
