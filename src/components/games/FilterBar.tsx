
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

interface FilterBarProps {
  selectedCategories: string[];
  sortBy: SortOption;
  sortDirection: "asc" | "desc";
  selectedPlaytime: string;
  search: string;
  selectedPlayerCount: PlayerCountOption;
  categories: Array<{ name: string }>;
  onCategoryToggle: (category: string, checked: boolean) => void;
  onCategoryRemove: (categoryToRemove: string) => void;
  onSortChange: (value: SortOption) => void;
  onSortDirectionToggle: () => void;
  onPlaytimeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onPlayerCountChange: (value: PlayerCountOption) => void;
  onResetFilters: () => void;
}

export const FilterBar = ({
  selectedCategories,
  sortBy,
  sortDirection,
  selectedPlaytime,
  search,
  selectedPlayerCount,
  categories,
  onCategoryToggle,
  onCategoryRemove,
  onSortChange,
  onSortDirectionToggle,
  onPlaytimeChange,
  onSearchChange,
  onPlayerCountChange,
  onResetFilters,
}: FilterBarProps) => {
  const isMobile = useIsMobile();

  // Determine background colors for active filters
  const hasCategoryFilter = selectedCategories.length > 0;
  const hasSearchFilter = search.trim() !== "";
  const hasPlaytimeFilter = selectedPlaytime !== "all";
  const hasPlayerCountFilter = selectedPlayerCount !== "any";
  const hasSortFilter = sortBy !== "name" || sortDirection !== "asc";
  const hasAnyFilter = hasCategoryFilter || hasSearchFilter || hasPlaytimeFilter || hasPlayerCountFilter || hasSortFilter;

  return (
    <>
      {/* Mobile: vertical stack with consistent spacing */}
      {isMobile ? (
        <div className="flex flex-col gap-3 mb-3 w-full max-w-6xl">
          {/* Search */}
          <div className="w-full">
            <TextSearch value={search} onChange={onSearchChange} active={hasSearchFilter} />
          </div>

          {/* Category */}
          <div className="w-full">
            <CategoryFilter
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={onCategoryToggle}
              onCategoryRemove={onCategoryRemove}
              active={hasCategoryFilter}
            />
          </div>

          {/* Playtime */}
          <div className="w-full">
            <PlaytimeFilter selected={selectedPlaytime} onChange={onPlaytimeChange} active={hasPlaytimeFilter} />
          </div>

          {/* Player Count */}
          <div className="w-full">
            <PlayerCountFilter selected={selectedPlayerCount} onChange={onPlayerCountChange} active={hasPlayerCountFilter} />
          </div>

          {/* Reset Filters */}
          <div className="w-full">
            <FilterButton
              label="Reset Filters"
              icon={<RefreshCw className="w-4 h-4 text-[hsl(var(--brand-light))]" />}
              onClick={onResetFilters}
              disabled={!hasAnyFilter}
              active={hasAnyFilter}
            />
          </div>

          {/* Sort Controls */}
          <div className="w-full">
            <SortControls
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={onSortChange}
              onDirectionToggle={onSortDirectionToggle}
              active={hasSortFilter}
            />
          </div>
        </div>
      ) : (
        /* Desktop: 3-column layout */
        <div className="grid grid-cols-3 gap-2 mb-4 w-full max-w-6xl items-start">
          {/* Left column: Search and Category */}
          <div className="flex flex-col gap-2 items-start">
            <div className="w-full md:w-64 max-w-full">
              <TextSearch value={search} onChange={onSearchChange} active={hasSearchFilter} />
            </div>
            <div className="w-full md:w-64 max-w-full">
              <CategoryFilter
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryToggle={onCategoryToggle}
                onCategoryRemove={onCategoryRemove}
                active={hasCategoryFilter}
              />
            </div>
          </div>
          {/* Center column: Playtime and Player Count */}
          <div className="flex flex-col gap-2 items-start">
            <div className="w-full md:w-64 max-w-full">
              <PlaytimeFilter selected={selectedPlaytime} onChange={onPlaytimeChange} active={hasPlaytimeFilter} />
            </div>
            <div className="w-full md:w-64 max-w-full">
              <PlayerCountFilter selected={selectedPlayerCount} onChange={onPlayerCountChange} active={hasPlayerCountFilter} />
            </div>
          </div>
          {/* Right column: Reset Filters + Sort */}
          <div className="flex flex-col gap-2 items-start">
            <FilterButton
              label="Reset Filters"
              icon={<RefreshCw className="w-4 h-4 text-[hsl(var(--brand-light))]" />}
              onClick={onResetFilters}
              disabled={!hasAnyFilter}
              active={hasAnyFilter}
            />

            <div className="w-full md:w-64 max-w-full">
              <SortControls
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                onDirectionToggle={onSortDirectionToggle}
                active={hasSortFilter}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
