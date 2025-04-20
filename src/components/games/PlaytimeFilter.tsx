
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const PLAYTIME_GROUPS = [
  {
    label: "All",
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

export const PlaytimeFilter = ({ selected, onChange }: PlaytimeFilterProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium mb-1">Playtime</span>
    <Select value={selected} onValueChange={onChange}>
      <SelectTrigger className="w-64 max-w-full">
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

export { PLAYTIME_GROUPS };

