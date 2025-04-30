import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import games from "../../data/games.json";
import categories from "../../data/game_categories.json";
import { CategoryFilter } from "@/components/games/CategoryFilter";
import { SortControls, type SortOption } from "@/components/games/SortControls";
import { GameGrid } from "@/components/games/GameGrid";
import { PlaytimeFilter, PLAYTIME_GROUPS } from "@/components/games/PlaytimeFilter";
import { TextSearch } from "@/components/games/TextSearch";
import { Game } from "@/types/game";
import { PlayerCountFilter, type PlayerCountOption } from "@/components/games/PlayerCountFilter";
import { cn } from "@/lib/utils";

const Index = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPlaytime, setSelectedPlaytime] = useState<string>("all");
  const [search, setSearch] = useState<string>(""); 
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<PlayerCountOption>("any");

  const allCategories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    games.forEach(game => {
      if (Array.isArray(game.category)) {
        game.category.forEach(cat => uniqueCategories.add(cat));
      }
    });
    return Array.from(uniqueCategories).sort().map(name => ({ name }));
  }, []);

  const handleCategoryToggle = (category: string, checked: boolean) => {
    console.log("handleCategoryToggle called with:", category, "checked:", checked);
    
    setSelectedCategories(prevCategories => {
      const newCategories = checked 
        ? [...prevCategories, category] 
        : prevCategories.filter(cat => cat !== category);
      
      console.log("Setting selected categories:", newCategories);
      return newCategories;
    });
  };

  const removeCategory = (categoryToRemove: string) => {
    console.log("removeCategory called with:", categoryToRemove);
    
    setSelectedCategories(prevCategories => {
      const newCategories = prevCategories.filter(cat => cat !== categoryToRemove);
      console.log("After removal, categories:", newCategories);
      return newCategories;
    });
  };

  useEffect(() => {
    const handleCategorySelected = (event: CustomEvent<string>) => {
      console.log("categorySelected event received with:", event.detail);
      setSelectedCategories([event.detail]);
    };

    window.addEventListener('categorySelected', handleCategorySelected as EventListener);

    return () => {
      window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
    };
  }, []);

  // Add detailed console log to track state changes
  useEffect(() => {
    console.log("Selected categories state updated:", selectedCategories);
  }, [selectedCategories]);

  function isInPlaytimeGroup(game: typeof games[0], group: string) {
    const pt = game.playtime_minutes ?? 0;
    if (group === "quick") return pt >= 0 && pt <= 30;
    if (group === "standard") return pt >= 31 && pt <= 60;
    if (group === "extended") return pt >= 61 && pt <= 120;
    if (group === "epic") return pt > 120;
    return true; // For "all"
  }

  function meetsPlayerCount(game: Game, count: PlayerCountOption): boolean {
    if (count === "any") return true;
    if (count === "5+") return game.max_players >= 5;
    const numPlayers = parseInt(count);
    return numPlayers >= game.min_players && numPlayers <= game.max_players;
  }

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPlaytime("all");
    setSearch("");
    setSelectedPlayerCount("any");
  };

  const isInIframe = useMemo(() => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }, []);

  const sortedAndFilteredGames = useMemo(() => {
    console.log("Recomputing sorted games with:", { 
      sortBy, 
      sortDirection, 
      selectedPlaytime, 
      search, 
      selectedPlayerCount,
      selectedCategories  // For debugging
    });

    let filteredGames = [...games]
      .filter(game =>
        (selectedCategories.length === 0 ||
          selectedCategories.every(cat => game.category.includes(cat)))
        && (selectedPlaytime === "all" || isInPlaytimeGroup(game, selectedPlaytime))
        && (search.trim() === "" ||
          game.name.toLowerCase().includes(search.toLowerCase()))
        && (selectedPlayerCount === "any" || meetsPlayerCount(game, selectedPlayerCount))
      );

    if (sortBy !== "name") {
      filteredGames = filteredGames.filter(game => game.name !== "Existence");
    }

    console.log(`Filtered games count: ${filteredGames.length}`);
    
    return filteredGames.sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;

      if (sortBy === "name") {
        return multiplier * a.name.localeCompare(b.name);
      } else if (sortBy === "playtime") {
        return multiplier * (a.playtime_minutes - b.playtime_minutes);
      } else {
        const propertyName = `${sortBy}_rank`;
        const valueA = a[propertyName as keyof typeof a] as number;
        const valueB = b[propertyName as keyof typeof b] as number;
        return multiplier * (valueA - valueB);
      }
    }) as Game[];
  }, [selectedCategories, selectedPlaytime, sortBy, sortDirection, search, selectedPlayerCount]);

  return (
    <div className={cn(
      "min-h-screen p-2 md:p-4 bg-black",
      isInIframe ? "max-h-screen h-screen overflow-hidden" : ""
    )}>
      <div className="mx-auto bg-white/10 backdrop-blur-sm rounded-lg p-4 h-full flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4 w-full max-w-6xl items-start">
          {/* Left column: Search and Category */}
          <div className="flex flex-col gap-2 items-start">
            <div className="w-full md:w-64 max-w-full">
              <TextSearch value={search} onChange={setSearch} />
            </div>
            <div className="w-full md:w-64 max-w-full">
              <CategoryFilter
                categories={allCategories}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                onCategoryRemove={removeCategory}
              />
            </div>
          </div>
          {/* Center column: Playtime and Player Count */}
          <div className="flex flex-col gap-2 items-start">
            <div className="w-full md:w-64 max-w-full">
              <PlaytimeFilter selected={selectedPlaytime} onChange={setSelectedPlaytime} />
            </div>
            <div className="w-full md:w-64 max-w-full">
              <PlayerCountFilter selected={selectedPlayerCount} onChange={setSelectedPlayerCount} />
            </div>
          </div>
          {/* Right column: Reset Filters + Sort */}
          <div className="flex flex-col gap-2 items-start">
            <div className="w-full md:w-64 max-w-full">
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className={cn("gap-2 w-full justify-start", "font-medium text-black border-gray-300 bg-white/90")}
              >
                <RefreshCw className="w-4 h-4 mr-2 text-black" />
                Reset Filters
              </Button>
            </div>
            <div className="w-full md:w-64 max-w-full">
              <SortControls
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSortChange={setSortBy}
                onDirectionToggle={() =>
                  setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
                }
              />
            </div>
          </div>
        </div>
        <div className={cn(
          "flex-grow overflow-hidden", 
          isInIframe ? "max-h-[calc(100vh-250px)]" : ""
        )}>
          <GameGrid games={sortedAndFilteredGames} selectedPlayerCount={selectedPlayerCount} />
        </div>
      </div>
    </div>
  );
};

export default Index;
