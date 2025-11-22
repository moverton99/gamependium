import { Button } from "@/components/ui/button";
import { Filter, X, Info } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoryFilterProps {
  categories: Array<{ name: string }>;
  selectedCategories: string[];
  categoryDescriptionMap: Record<string, string>;
  onCategoryToggle: (category: string, checked: boolean) => void;
  onCategoryRemove: (categoryToRemove: string) => void;
  active: boolean;
}

/**
 * A dropdown filter for selecting game categories.
 * Supports multiple selections and shows descriptions for each category.
 */
export const CategoryFilter = ({
  categories,
  selectedCategories,
  categoryDescriptionMap,
  onCategoryToggle,
  onCategoryRemove,
  active,
}: CategoryFilterProps) => {
  const isMobile = useIsMobile();

  if (!categories || !Array.isArray(categories)) {
    console.warn("CategoryFilter: categories is missing or not an array", categories);
    return null;
  }

  const safeDescriptionMap = categoryDescriptionMap || {};
  const safeSelectedCategories = Array.isArray(selectedCategories) ? selectedCategories : [];

  const buttonText = safeSelectedCategories.length === 0
    ? "Category"
    : selectedCategories.length === 1
      ? selectedCategories[0]
      : selectedCategories.slice(0, 2).join(", ") +
      (selectedCategories.length > 2 ? `, +${selectedCategories.length - 2}` : "");

  useEffect(() => {
    console.log("CategoryFilter received selectedCategories:", safeSelectedCategories);
  }, [safeSelectedCategories]);

  const clearAllSelections = () => {
    console.log("Clearing all category selections");
    safeSelectedCategories.forEach(category => {
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
              "overflow-hidden w-full flex items-center justify-start border border-[hsl(var(--brand-orange))] bg-[hsl(var(--brand-darkGreen))] text-[hsl(var(--brand-light))]",
              active && "bg-[hsl(var(--brand-orange))] text-[hsl(var(--brand-darkGreen))]"
            )}
          >
            <Filter className="w-4 h-4 text-[hsl(var(--brand-light))] flex-shrink-0" />
            <span className="truncate">{buttonText}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[500px] p-0 bg-[hsl(var(--brand-darkGreen))] text-[hsl(var(--brand-light))] border border-[hsl(var(--brand-orange))]">
          <ScrollArea className="h-80">
            <div className="flex items-center justify-between p-2 border-b border-[hsl(var(--brand-orange))]">
              <div className="flex-1 max-w-[75%]">
                <DropdownMenuItem
                  className="p-2 hover:bg-[hsl(var(--brand-orange))]/20 font-medium"
                  onClick={clearAllSelections}
                >
                  <span className="px-2">All (Clear Selections)</span>
                </DropdownMenuItem>
              </div>
              <div className="flex items-center justify-center w-10 h-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full p-0 flex items-center justify-center bg-[hsl(var(--brand-darkGreen))] hover:bg-[hsl(var(--brand-orange))]/20 border border-[hsl(var(--brand-orange))]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Info className="h-5 w-5 text-[hsl(var(--brand-light))] block" />
                      <span className="sr-only">Category Info</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto bg-[hsl(var(--brand-darkGreen))] text-[hsl(var(--brand-light))] border border-[hsl(var(--brand-orange))]">
                    <DialogHeader>
                      <DialogTitle className="text-[hsl(var(--brand-light))]">Category Descriptions</DialogTitle>
                      <DialogDescription className="text-[hsl(var(--brand-light))]/70">
                        Browse game categories and their descriptions
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[60vh] pr-4">
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <div key={category.name} className="border-b border-[hsl(var(--brand-orange))]/30 pb-1 last:border-0">
                            <p className="text-sm text-[hsl(var(--brand-light))]">
                              <span className="font-bold">{category.name}: </span>
                              {safeDescriptionMap[category.name] || "No description available"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 p-2">
              {categories.map((category) => {
                const isSelected = safeSelectedCategories.includes(category.name);
                const description = safeDescriptionMap[category.name] || "No description available";
                return (
                  <Tooltip key={category.name} delayDuration={300}>
                    <TooltipTrigger asChild>
                      <DropdownMenuCheckboxItem
                        checked={isSelected}
                        onSelect={(e) => {
                          e.preventDefault();
                          const willBeChecked = !safeSelectedCategories.includes(category.name);
                          onCategoryToggle(category.name, willBeChecked);
                        }}
                        className={cn(
                          "p-2 text-[hsl(var(--brand-light))]",
                          isSelected && "bg-[hsl(var(--brand-orange))]/20 font-medium"
                        )}
                      >
                        <div className="pl-6 relative">{category.name}</div>
                      </DropdownMenuCheckboxItem>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs bg-[hsl(var(--brand-darkGreen))] text-[hsl(var(--brand-light))] border border-[hsl(var(--brand-orange))]/40">
                      {description}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>
      {safeSelectedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {safeSelectedCategories.map((category) => (
            <div
              key={category}
              className="flex items-center gap-1 px-2 py-1 bg-[hsl(var(--brand-orange))]/20 text-[hsl(var(--brand-light))] border border-[hsl(var(--brand-orange))] rounded-full text-sm"
            >
              {category}
              <button
                onClick={() => onCategoryRemove(category)}
                className="hover:bg-[hsl(var(--brand-orange))]/30 rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
