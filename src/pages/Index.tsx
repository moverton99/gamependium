
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import games from "../../data/games.json";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterBar } from "@/components/layout/FilterBar";
import { GameContainer } from "@/components/layout/GameContainer";
import { useGameFiltering } from "@/hooks/useGameFiltering";
import { useCategorySelection } from "@/hooks/useCategorySelection";

const Index = () => {
  const { 
    filterState,
    sortedAndFilteredGames,
    handlers
  } = useGameFiltering(games);

  const { allCategories } = useCategorySelection(games, handlers.setSelectedCategories);
  
  const isMobile = useIsMobile();
  
  const isInIframe = useMemo(() => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }, []);

  return (
    <div className={cn(
      "min-h-screen p-2 md:p-4 bg-black",
      isInIframe ? "max-h-screen h-screen overflow-hidden" : ""
    )}>
      <div className="mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-4 h-full flex flex-col">
        <FilterBar
          selectedCategories={filterState.selectedCategories}
          sortBy={filterState.sortBy}
          sortDirection={filterState.sortDirection}
          selectedPlaytime={filterState.selectedPlaytime}
          search={filterState.search}
          selectedPlayerCount={filterState.selectedPlayerCount}
          categories={allCategories}
          onCategoryToggle={handlers.handleCategoryToggle}
          onCategoryRemove={handlers.removeCategory}
          onSortChange={handlers.setSortBy}
          onSortDirectionToggle={() => handlers.setSortDirection(current => (current === "asc" ? "desc" : "asc"))}
          onPlaytimeChange={handlers.setSelectedPlaytime}
          onSearchChange={handlers.setSearch}
          onPlayerCountChange={handlers.setSelectedPlayerCount}
          onResetFilters={handlers.resetFilters}
        />
        
        <GameContainer 
          games={sortedAndFilteredGames} 
          selectedPlayerCount={filterState.selectedPlayerCount} 
          isInIframe={isInIframe}
        />
      </div>
    </div>
  );
};

export default Index;
