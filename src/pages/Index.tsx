import { useState, useMemo, useEffect } from "react";
import games from "../../data/games.json";
import categories from "../../data/game_categories.json";
import { CategoryFilter } from "@/components/games/CategoryFilter";
import { SortControls, type SortOption } from "@/components/games/SortControls";
import { GameGrid } from "@/components/games/GameGrid";

const Index = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedCategories = [...categories].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

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

  const sortedAndFilteredGames = useMemo(() => {
    console.log("Recomputing sorted games with:", { sortBy, sortDirection });
    
    return [...games]
      .filter(game => 
        selectedCategories.length === 0 || 
        selectedCategories.every(cat => game.category.includes(cat))
      )
      .sort((a, b) => {
        const multiplier = sortDirection === "asc" ? 1 : -1;
        
        if (sortBy === "name") {
          return multiplier * a.name.localeCompare(b.name);
        } else {
          const propertyName = `${sortBy}_rank`;
          const valueA = a[propertyName as keyof typeof a] as number;
          const valueB = b[propertyName as keyof typeof b] as number;
          return multiplier * (valueA - valueB);
        }
      });
  }, [selectedCategories, sortBy, sortDirection]);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Board Game Library</h1>
        <div className="flex items-center gap-3 mb-8">
          <CategoryFilter
            categories={sortedCategories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            onCategoryRemove={removeCategory}
          />
          <SortControls
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortChange={setSortBy}
            onDirectionToggle={() => setSortDirection(current => current === "asc" ? "desc" : "asc")}
          />
        </div>
        <GameGrid games={sortedAndFilteredGames} />
      </div>
    </div>
  );
};

export default Index;
