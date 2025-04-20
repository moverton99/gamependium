
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const PLAYTIME_GROUPS = [
  {
    label: "All",
    value: "all",
    description: "Show all playtimes",
  },
  {
    label: "Quick",
    value: "quick",
    description: "0–30 mins — Fast-paced games, great for fillers or casual sessions.",
  },
  {
    label: "Standard",
    value: "standard",
    description: "31–60 mins — Typical board game session—accessible yet satisfying.",
  },
  {
    label: "Extended",
    value: "extended",
    description: "61–120 mins — Heavier strategy games or games with moderate setup.",
  },
  {
    label: "Epic",
    value: "epic",
    description: "120+ mins — Long-form games, often involving campaigns or deep strategy.",
  },
];

interface PlaytimeFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

export const PlaytimeFilter = ({ selected, onChange }: PlaytimeFilterProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium mb-1">Filter by Playtime</span>
    <Select value={selected} onValueChange={onChange}>
      <SelectTrigger className="w-64 max-w-full">
        <SelectValue placeholder="Select playtime" />
      </SelectTrigger>
      <SelectContent>
        {PLAYTIME_GROUPS.map((group) => (
          <SelectItem key={group.value} value={group.value}>
            <div className="flex flex-col">
              <span>{group.label}</span>
              {group.value !== "all" &&
                <span className="text-xs text-muted-foreground">{group.description}</span>
              }
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export { PLAYTIME_GROUPS };
