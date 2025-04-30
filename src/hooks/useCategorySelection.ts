
import { useEffect, useMemo } from "react";
import { Game } from "@/types/game";

export const useCategorySelection = (
  games: Game[], 
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>
) => {
  // Extract unique categories from games
  const allCategories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    games.forEach(game => {
      if (Array.isArray(game.category)) {
        game.category.forEach(cat => uniqueCategories.add(cat));
      }
    });
    return Array.from(uniqueCategories).sort().map(name => ({ name }));
  }, [games]);

  // Listen for categorySelected events
  useEffect(() => {
    const handleCategorySelected = (event: CustomEvent<string>) => {
      console.log("categorySelected event received with:", event.detail);
      setSelectedCategories([event.detail]);
    };

    window.addEventListener('categorySelected', handleCategorySelected as EventListener);

    return () => {
      window.removeEventListener('categorySelected', handleCategorySelected as EventListener);
    };
  }, [setSelectedCategories]);

  return { allCategories };
};
