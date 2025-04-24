
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const PLAYER_COUNT_OPTIONS = ["any", "1", "2", "3", "4", "5+"] as const;
export type PlayerCountOption = (typeof PLAYER_COUNT_OPTIONS)[number];

interface PlayerCountFilterProps {
  selected: PlayerCountOption;
  onChange: (value: PlayerCountOption) => void;
}

export const PlayerCountFilter = ({ selected, onChange }: PlayerCountFilterProps) => {
  return (
    <div className="flex flex-col w-full md:w-64 max-w-full">
      <div className="flex items-center gap-2 bg-white/90 rounded-md px-3 py-2 border border-gray-300">
        <Users className="w-4 h-4 text-black" />
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger className={cn("w-full md:w-auto border-0 bg-transparent p-0 h-auto shadow-none text-black", "font-medium")}>
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
    </div>
  );
};
