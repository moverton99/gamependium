
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { categoryDescriptionMap } from "./categoryDescriptions";

interface CategoryFilterProps {
  categories: Array<{ name: string }>;
  selectedCategories: string[];
  onCategoryToggle: (category: string, checked: boolean) => void;
  onCategoryRemove: (category: string) => void;
  active?: boolean;
}

export const CategoryFilter = ({
  categories,
  selectedCategories,
  onCategoryToggle,
  onCategoryRemove,
  active = false,
}: CategoryFilterProps) => {
  // Determine button text based on selected categories
  const buttonText = selectedCategories.length === 0
    ? "Category"
    : selectedCategories.length === 1
      ? selectedCategories[0]
      : selectedCategories.slice(0, 2).join(", ") + 
        (selectedCategories.length > 2 ? `, +${selectedCategories.length - 2}` : "");
    
  // Log when props change
  useEffect(() => {
    console.log("CategoryFilter received selectedCategories:", selectedCategories);
  }, [selectedCategories]);

  const clearAllSelections = () => {
    console.log("Clearing all category selections");
    // Remove all selected categories
    selectedCategories.forEach(category => {
      onCategoryRemove(category);
    });
  };

  return (
    <div className="flex flex-col w-full md:w-64 max-w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "w-full flex items-center gap-2 justify-start text-black border-gray-300 text-ellipsis overflow-hidden",
              active ? "bg-[#bcd8f7]" : "bg-white/90"
            )}
          >
            <Filter className="w-4 h-4 text-black flex-shrink-0" />
            <span className="truncate">{buttonText}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[500px] p-0 bg-white">
          <ScrollArea className="h-80">
            {/* Add "All" option at the top */}
            <DropdownMenuItem
              className="p-2 hover:bg-primary/10 font-medium"
              onClick={clearAllSelections}
            >
              <div className="px-6">All (Clear Selections)</div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1" />
            
            <div className="grid grid-cols-2 gap-1 p-2">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.name);
                const description = categoryDescriptionMap[category.name] || "No description available";
                
                return (
                <Tooltip key={category.name} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <DropdownMenuCheckboxItem
                      checked={isSelected}
                      onSelect={(e) => {
                        // Prevent the default selection behavior which might be causing the issue
                        e.preventDefault();
                        const willBeChecked = !selectedCategories.includes(category.name);
                        console.log(`Selecting category: ${category.name}, will be checked: ${willBeChecked}`);
                        onCategoryToggle(
                          category.name, 
                          willBeChecked
                        );
                      }}
                      className={cn(
                        "p-2",
                        isSelected && "bg-primary/10 font-medium"
                      )}
                    >
                      <div className="pl-6 relative">
                        {/* Ensure text doesn't overlap with the checkbox */}
                        {category.name}
                      </div>
                    </DropdownMenuCheckboxItem>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs bg-white text-black border border-gray-200">
                    {description}
                  </TooltipContent>
                </Tooltip>
                );
              })}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
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
