
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TextSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextSearch = ({ value, onChange }: TextSearchProps) => (
  <div className="flex items-center gap-2 w-full md:w-96 max-w-full">
    <span className="flex items-center">
      <Search className="w-4 h-4 text-muted-foreground" />
    </span>
    <Input
      className="w-full"
      type="text"
      placeholder="Search games..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete="off"
    />
  </div>
);
