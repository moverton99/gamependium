
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Clock } from "lucide-react";

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
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex flex-col" onClick={handleClick}>
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="w-64 max-w-full pl-10 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Clock className="w-4 h-4 text-muted-foreground" />
          </span>
          <SelectValue placeholder="Select playtime" />
        </SelectTrigger>
        <SelectContent>
          {PLAYTIME_GROUPS.map((group) => (
            <SelectItem key={group.value} value={group.value}>
              <span>{group.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { PLAYTIME_GROUPS };
