import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextSearchProps {
  value: string;
  onChange: (value: string) => void;
  active: boolean;
}

/**
 * A simple text input for searching games by name.
 */
export const TextSearch = ({ value, onChange, active }: TextSearchProps) => (
  <div className="relative w-full md:w-64 max-w-full">
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
      <Search className="w-4 h-4 text-[hsl(var(--brand-light))]" />
    </span>
    <Input
      className={cn(
        "w-full pl-10 pr-8 text-[hsl(var(--brand-light))] border-[hsl(var(--brand-orange))] placeholder:text-[hsl(var(--brand-light))]/70",
        active
          ? "bg-[hsl(var(--brand-orange))]"
          : "bg-[hsl(var(--brand-darkGreen))]"
      )}
      type="text"
      placeholder="Search games..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
    {value && (
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 rounded hover:bg-[hsl(var(--brand-orange))]/20 transition"
        onClick={() => onChange("")}
        tabIndex={-1}
        aria-label="Clear search"
      >
        <X className="w-4 h-4 text-[hsl(var(--brand-light))]" />
      </button>
    )}
  </div>
);
