
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
  active?: boolean;
}

export const PlaytimeFilter = ({ selected, onChange, active = false }: PlaytimeFilterProps) => {
  return (
    <div className="flex flex-col w-full md:w-64 max-w-full">
      <div className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 border border-gray-300",
        active ? "bg-[#bcd8f7]" : "bg-white/90"
      )}>
        <Clock className="w-4 h-4 text-black" />
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger className={cn("w-full md:w-auto border-0 bg-transparent p-0 h-auto shadow-none text-black", "font-medium")}>
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
