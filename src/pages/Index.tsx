
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { FilterBar } from "@/components/games/FilterBar";
import { GameContainer } from "@/components/ui/GameContainer";
import { useGameFiltering } from "@/hooks/useGameFiltering";
import { useCategorySelection } from "@/hooks/useCategorySelection";
import { DataProvider, useData } from "@/contexts/DataContext";

const GameExplorer = () => {
  const { games, categoryDescriptionMap, isLoading, error } = useData();

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

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading game data...</div>;
  }

  return (
    <div className={cn(
      "min-h-screen p-2 md:p-4 bg-black",
      isInIframe ? "max-h-screen h-screen overflow-hidden" : ""
    )}>
      <div className="mx-auto p-4 h-full flex flex-col">
        {error && (
          <div className="bg-red-900/50 text-red-200 p-2 mb-4 rounded text-center text-sm">
            {error}
          </div>
        )}
        <FilterBar
          selectedCategories={filterState.selectedCategories}
          sortBy={filterState.sortBy}
          sortDirection={filterState.sortDirection}
          selectedPlaytime={filterState.selectedPlaytime}
          search={filterState.search}
          selectedPlayerCount={filterState.selectedPlayerCount}
          soldByOKG={filterState.soldByOKG}
          categories={allCategories}
          categoryDescriptionMap={categoryDescriptionMap}
          onCategoryToggle={handlers.handleCategoryToggle}
          onCategoryRemove={handlers.removeCategory}
          onSortChange={handlers.setSortBy}
          onSortDirectionToggle={() => handlers.setSortDirection(current => (current === "asc" ? "desc" : "asc"))}
          onPlaytimeChange={handlers.setSelectedPlaytime}
          onSearchChange={handlers.setSearch}
          onPlayerCountChange={handlers.setSelectedPlayerCount}
          onSoldByOKGToggle={handlers.setSoldByOKG}
          selectedCoop={filterState.selectedCoop}
          onCoopChange={handlers.setSelectedCoop}
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

const Index = () => {
  return (
    <DataProvider>
      <GameExplorer />
    </DataProvider>
  );
};

export default Index;
