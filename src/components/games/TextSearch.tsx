
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TextSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextSearch = ({ value, onChange }: TextSearchProps) => (
  <div className="relative w-full md:w-96 max-w-full">
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
      <Search className="w-4 h-4 text-muted-foreground" />
    </span>
    <Input
      className="w-full pl-10"
      type="text"
      placeholder="Search games..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  </div>
);

