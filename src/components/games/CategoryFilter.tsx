
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="flex flex-col md:w-44 w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full flex items-center gap-2 justify-start">
            <Filter className="w-4 h-4" />
            Filter by Category
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[500px] p-0">
          <ScrollArea className="h-80">
            <div className="grid grid-cols-2 gap-1 p-2">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category.name}
                  checked={selectedCategories.includes(category.name)}
                  onCheckedChange={(checked) => onCategoryToggle(category.name, checked)}
                  className="p-2"
                >
                  {category.name}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Chips under the control, wrap as needed */}
      <div className="flex flex-wrap items-center gap-2 mt-2">
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
    </div>
  );
};
