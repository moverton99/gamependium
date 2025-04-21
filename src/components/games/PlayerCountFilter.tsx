
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";

export const PLAYER_COUNT_OPTIONS = ["any", "1", "2", "3", "4", "5+"] as const;
export type PlayerCountOption = (typeof PLAYER_COUNT_OPTIONS)[number];

interface PlayerCountFilterProps {
  selected: PlayerCountOption;
  onChange: (value: PlayerCountOption) => void;
}

export const PlayerCountFilter = ({ selected, onChange }: PlayerCountFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Users className="w-4 h-4" />
      <Select value={selected} onValueChange={onChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Any players" />
        </SelectTrigger>
        <SelectContent>
          {PLAYER_COUNT_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {option === "any" ? "Any players" : option === "5+" ? "5 or more" : `${option} players`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
