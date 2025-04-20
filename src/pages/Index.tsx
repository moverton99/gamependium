import { useState, useMemo, useEffect } from "react";
import games from "../../data/games.json";
import categories from "../../data/game_categories.json";
import { CategoryFilter } from "@/components/games/CategoryFilter";
import { SortControls, type SortOption } from "@/components/games/SortControls";
import { GameGrid } from "@/components/games/GameGrid";
import { PlaytimeFilter, PLAYTIME_GROUPS } from "@/components/games/PlaytimeFilter";

const Index = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPlaytime, setSelectedPlaytime] = useState<string>("all");

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
    setSelectedCategories(old => 
      checked ? [...old, category] : old.filter(cat => cat !== category)
    );
  };

  const removeCategory = (categoryToRemove: string) => {
    setSelectedCategories(old => old.filter(cat => cat !== categoryToRemove));
  };

  useEffect(() => {
    const handleCategorySelected = (event: CustomEvent<string>) => {
      setSelectedCategories([event.detail]);
    };

    window.addEventListener('categorySelected', handleCategorySelected as EventListener);

    return () => {
      window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
    };
  }, []);

  function isInPlaytimeGroup(game: typeof games[0], group: string) {
    const pt = game.playtime_minutes ?? 0;
    if (group === "quick") return pt >= 0 && pt <= 30;
    if (group === "standard") return pt >= 31 && pt <= 60;
    if (group === "extended") return pt >= 61 && pt <= 120;
    if (group === "epic") return pt > 120;
    return true; // For "all"
  }

  const sortedAndFilteredGames = useMemo(() => {
    console.log("Recomputing sorted games with:", { sortBy, sortDirection, selectedPlaytime });

    return [...games]
      .filter(game =>
        (selectedCategories.length === 0 ||
          selectedCategories.every(cat => game.category.includes(cat)))
        && (selectedPlaytime === "all" || isInPlaytimeGroup(game, selectedPlaytime))
      )
      .sort((a, b) => {
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
      });
  }, [selectedCategories, selectedPlaytime, sortBy, sortDirection]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Game Explorer</h1>
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-3">
            <CategoryFilter
              categories={allCategories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              onCategoryRemove={removeCategory}
            />
            <SortControls
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortChange={setSortBy}
              onDirectionToggle={() =>
                setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
              }
            />
          </div>
          <PlaytimeFilter selected={selectedPlaytime} onChange={setSelectedPlaytime} />
        </div>
        <GameGrid games={sortedAndFilteredGames} />
      </div>
    </div>
  );
};

export default Index;
