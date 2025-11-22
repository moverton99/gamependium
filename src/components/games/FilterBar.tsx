
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryFilter } from "@/components/games/CategoryFilter";
import { SortControls, type SortOption } from "@/components/games/SortControls";
import { PlaytimeFilter } from "@/components/games/PlaytimeFilter";
import { TextSearch } from "@/components/games/TextSearch";
import { PlayerCountFilter, type PlayerCountOption } from "@/components/games/PlayerCountFilter";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterButton } from "@/components/games/FilterButton";
import { CoopFilter, type CoopFilterOption } from "@/components/games/CoopFilter";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShoppingBag } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FilterBarProps {
  selectedCategories: string[];
  sortBy: SortOption;
  sortDirection: "asc" | "desc";
  selectedPlaytime: string;
  search: string;
  selectedPlayerCount: PlayerCountOption;
  soldByOKG: boolean;
  selectedCoop: CoopFilterOption;
  categories: Array<{ name: string }>;
  categoryDescriptionMap: Record<string, string>;
  onCategoryToggle: (category: string, checked: boolean) => void;
  onCategoryRemove: (categoryToRemove: string) => void;
  onSortChange: (value: SortOption) => void;
  onSortDirectionToggle: () => void;
  onPlaytimeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onPlayerCountChange: (value: PlayerCountOption) => void;
  onSoldByOKGToggle: (checked: boolean) => void;
  onCoopChange: (value: CoopFilterOption) => void;
  onResetFilters: () => void;
}

/**
 * A comprehensive toolbar containing all filter and sort controls.
 * Adapts its layout for mobile and desktop views.
 */
export const FilterBar = ({
  selectedCategories,
  sortBy,
  sortDirection,
  selectedPlaytime,
  search,
  selectedPlayerCount,
  soldByOKG,
  selectedCoop,
  categories,
  categoryDescriptionMap,
  onCategoryToggle,
  onCategoryRemove,
  onSortChange,
  onSortDirectionToggle,
  onPlaytimeChange,
  onSearchChange,
  onPlayerCountChange,
  onSoldByOKGToggle,
  onCoopChange,
  onResetFilters,
}: FilterBarProps) => {
  const isMobile = useIsMobile();

  // Determine background colors for active filters
  const hasCategoryFilter = selectedCategories.length > 0;
  const hasSearchFilter = search.trim() !== "";
  const hasPlaytimeFilter = selectedPlaytime !== "all";
  const hasPlayerCountFilter = selectedPlayerCount !== "any";
  const hasSortFilter = sortBy !== "name" || sortDirection !== "asc";
  const hasSoldByOKGFilter = soldByOKG;
  const hasCoopFilter = selectedCoop !== "all";
  const hasAnyFilter = hasCategoryFilter || hasSearchFilter || hasPlaytimeFilter || hasPlayerCountFilter || hasSortFilter || hasSoldByOKGFilter || hasCoopFilter;

  return (
    <>
      {/* Mobile: vertical stack with consistent spacing */}
      {isMobile ? (
        <div className="flex flex-col gap-3 mb-3 w-full max-w-6xl">
          {/* Search */}
          <div className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <TextSearch value={search} onChange={onSearchChange} active={hasSearchFilter} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search games by title</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Category */}
          <div className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CategoryFilter
                    categories={categories}
                    selectedCategories={selectedCategories}
                    categoryDescriptionMap={categoryDescriptionMap}
                    onCategoryToggle={onCategoryToggle}
                    onCategoryRemove={onCategoryRemove}
                    active={hasCategoryFilter}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter games by category (e.g., Strategy, Party)</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Coop */}
          <div className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <CoopFilter selected={selectedCoop} onChange={onCoopChange} active={hasCoopFilter} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by cooperative or competitive gameplay</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Playtime */}
          <div className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <PlaytimeFilter selected={selectedPlaytime} onChange={onPlaytimeChange} active={hasPlaytimeFilter} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by average game duration</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Player Count */}
          <div className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <PlayerCountFilter selected={selectedPlayerCount} onChange={onPlayerCountChange} active={hasPlayerCountFilter} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter by number of players</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Sold by OKG Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full flex items-center space-x-2 bg-[hsl(var(--brand-darkGreen))] border border-[hsl(var(--brand-orange))] rounded-md p-2">
                <Switch
                  id="sold-by-okg-mobile"
                  checked={soldByOKG}
                  onCheckedChange={onSoldByOKGToggle}
                  className="data-[state=checked]:bg-[hsl(var(--brand-orange))]"
                />
                <Label htmlFor="sold-by-okg-mobile" className="text-[hsl(var(--brand-light))] flex items-center gap-2 cursor-pointer">
                  <ShoppingBag className="w-4 h-4" />
                  Sold by OverKnight Games
                </Label>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Show only games sold by OverKnight Games</p>
            </TooltipContent>
          </Tooltip>

          {/* Reset Filters */}
          <div className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FilterButton
                    label="Reset Filters"
                    icon={<RefreshCw className="w-4 h-4 text-[hsl(var(--brand-light))]" />}
                    onClick={onResetFilters}
                    disabled={!hasAnyFilter}
                    active={hasAnyFilter}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all active filters and search terms</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Sort Controls */}
          <div className="w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <SortControls
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                    onSortChange={onSortChange}
                    onDirectionToggle={onSortDirectionToggle}
                    active={hasSortFilter}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sort games by name, playtime, or complexity</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      ) : (
        /* Desktop: 3-column layout */
        <div className="grid grid-cols-3 gap-2 mb-4 w-full max-w-6xl items-start">
          {/* Left column: Search and Category */}
          <div className="flex flex-col gap-2 items-start">
            <div className="w-full md:w-64 max-w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <TextSearch value={search} onChange={onSearchChange} active={hasSearchFilter} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Search games by title</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="w-full md:w-64 max-w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <CategoryFilter
                      categories={categories}
                      selectedCategories={selectedCategories}
                      categoryDescriptionMap={categoryDescriptionMap}
                      onCategoryToggle={onCategoryToggle}
                      onCategoryRemove={onCategoryRemove}
                      active={hasCategoryFilter}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter games by category (e.g., Strategy, Party)</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="w-full md:w-64 max-w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <CoopFilter selected={selectedCoop} onChange={onCoopChange} active={hasCoopFilter} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by cooperative or competitive gameplay</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {/* Center column: Playtime, Player Count, Sold by OKG */}
          <div className="flex flex-col gap-2 items-start">
            <div className="w-full md:w-64 max-w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <PlaytimeFilter selected={selectedPlaytime} onChange={onPlaytimeChange} active={hasPlaytimeFilter} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by average game duration</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="w-full md:w-64 max-w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <PlayerCountFilter selected={selectedPlayerCount} onChange={onPlayerCountChange} active={hasPlayerCountFilter} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter by number of players</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full md:w-64 max-w-full flex items-center space-x-2 bg-[hsl(var(--brand-darkGreen))] border border-[hsl(var(--brand-orange))] rounded-md p-2 h-10">
                  <Switch
                    id="sold-by-okg-desktop"
                    checked={soldByOKG}
                    onCheckedChange={onSoldByOKGToggle}
                    className="data-[state=checked]:bg-[hsl(var(--brand-orange))]"
                  />
                  <Label htmlFor="sold-by-okg-desktop" className="text-[hsl(var(--brand-light))] text-sm flex items-center gap-2 cursor-pointer whitespace-nowrap">
                    <ShoppingBag className="w-4 h-4" />
                    Sold by OKG
                  </Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show only games sold by OverKnight Games</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Right column: Reset Filters + Sort */}
          <div className="flex flex-col gap-2 items-start">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <FilterButton
                    label="Reset Filters"
                    icon={<RefreshCw className="w-4 h-4 text-[hsl(var(--brand-light))]" />}
                    onClick={onResetFilters}
                    disabled={!hasAnyFilter}
                    active={hasAnyFilter}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all active filters and search terms</p>
              </TooltipContent>
            </Tooltip>

            <div className="w-full md:w-64 max-w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <SortControls
                      sortBy={sortBy}
                      sortDirection={sortDirection}
                      onSortChange={onSortChange}
                      onDirectionToggle={onSortDirectionToggle}
                      active={hasSortFilter}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sort games by name, playtime, or complexity</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
