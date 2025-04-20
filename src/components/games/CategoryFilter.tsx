
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CategoryFilterProps {
  categories: Array<{ name: string }>;
  selectedCategories: string[];
  onCategoryToggle: (category: string, checked: boolean) => void;
  onCategoryRemove: (category: string) => void;
}

export const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onCategoryRemove,
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 flex-grow">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter by Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.name}
              checked={selectedCategories.includes(category.name)}
              onCheckedChange={(checked) => onCategoryToggle(category.name, checked)}
            >
              {category.name}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedCategories.map((category) => (
        <div
          key={category}
          className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
        >
          {category}
          <button
            onClick={() => onCategoryRemove(category)}
            className="hover:bg-primary/20 rounded-full p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
};
