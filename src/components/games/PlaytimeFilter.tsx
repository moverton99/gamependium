
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const PLAYTIME_GROUPS = [
  {
    label: "All Playtimes",
    value: "all",
    description: "",
  },
  {
    label: "Quick 0–30",
    value: "quick",
    description: "",
  },
  {
    label: "Standard 31–60",
    value: "standard",
    description: "",
  },
  {
    label: "Extended 61–120",
    value: "extended",
    description: "",
  },
  {
    label: "Epic 120+",
    value: "epic",
    description: "",
  },
];

interface PlaytimeFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

export const PlaytimeFilter = ({ selected, onChange }: PlaytimeFilterProps) => {
  return (
    <div className="flex flex-col w-full md:w-64 max-w-full">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-white" />
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger className={cn("w-full md:w-64 max-w-full text-white border-white/20", "font-medium")}>
            <SelectValue placeholder="Select playtime" />
          </SelectTrigger>
          <SelectContent>
            {PLAYTIME_GROUPS.map((group) => (
              <SelectItem key={group.value} value={group.value}>
                {group.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { PLAYTIME_GROUPS };
