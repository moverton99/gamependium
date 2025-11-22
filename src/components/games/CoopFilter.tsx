import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

export type CoopFilterOption = "all" | "coop" | "competitive";

interface CoopFilterProps {
    selected: CoopFilterOption;
    onChange: (value: CoopFilterOption) => void;
    active: boolean;
}

/**
 * A dropdown filter for selecting cooperative vs competitive games.
 */
export const CoopFilter = ({ selected, onChange, active }: CoopFilterProps) => {
    const handleContainerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="flex flex-col w-full md:w-64 max-w-full" onClick={handleContainerClick}>
            <div className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 border border-brand-orange",
                active
                    ? "bg-[hsl(var(--brand-orange))]"
                    : "bg-[hsl(var(--brand-darkGreen))]"
            )}>
                <Handshake className="w-4 h-4 text-brand-light" />
                <Select value={selected} onValueChange={(value) => onChange(value as CoopFilterOption)}>
                    <SelectTrigger className={cn("w-full md:w-auto border-0 bg-transparent p-0 h-auto shadow-none text-brand-light", "font-medium")}>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-darkGreen" onClick={(e) => e.stopPropagation()}>
                        <SelectItem value="all" className="cursor-pointer">Coop and Competitive</SelectItem>
                        <SelectItem value="coop" className="cursor-pointer">Cooperative</SelectItem>
                        <SelectItem value="competitive" className="cursor-pointer">Competitive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};
