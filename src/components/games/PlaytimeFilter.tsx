
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PLAYTIME_GROUPS = [
  {
    label: "All",
    value: "all",
    description: "Show all playtimes",
  },
  {
    label: "Quick",
    value: "quick",
    description: "0–30 mins",
  },
  {
    label: "Standard",
    value: "standard",
    description: "31–60 mins",
  },
  {
    label: "Extended",
    value: "extended",
    description: "61–120 mins",
  },
  {
    label: "Epic",
    value: "epic",
    description: "120+ mins",
  },
];

interface PlaytimeFilterProps {
  selected: string;
  onChange: (value: string) => void;
}

export const PlaytimeFilter = ({ selected, onChange }: PlaytimeFilterProps) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium mb-1">Filter by Playtime</span>
    <RadioGroup
      value={selected}
      onValueChange={onChange}
      className="flex flex-row gap-2"
    >
      {PLAYTIME_GROUPS.map((group) => (
        <label 
          key={group.value}
          className="flex items-center gap-1 cursor-pointer"
        >
          <RadioGroupItem value={group.value} />
          <span>{group.label}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            {group.value !== "all" ? `(${group.description})` : ""}
          </span>
        </label>
      ))}
    </RadioGroup>
  </div>
);

export { PLAYTIME_GROUPS };
