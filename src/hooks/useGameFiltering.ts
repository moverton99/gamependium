
import { useMemo, useState } from "react";
import { Game } from "@/types/game";
import { SortOption } from "@/components/games/SortControls";
import { PlayerCountOption } from "@/components/games/PlayerCountFilter";
import { CoopFilterOption } from "@/components/games/CoopFilter";

/**
 * Represents the state of all active filters and sort options.
 */
export type GameFilterState = {
  selectedCategories: string[];
  sortBy: SortOption;
  sortDirection: "asc" | "desc";
  selectedPlaytime: string;
  search: string;
  selectedPlayerCount: PlayerCountOption;
  soldByOKG: boolean;
  selectedCoop: CoopFilterOption;
};

/**
 * Custom hook to manage the filtering and sorting logic for the game list.
 * Handles state for various filters (category, playtime, player count, etc.) and
 * performs the actual filtering and sorting of the game data.
 * 
 * @param allGames - The complete list of games to filter and sort.
 * @returns An object containing the current filter state, the filtered list of games, and state updater functions.
 */
export const useGameFiltering = (allGames: Game[]) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedPlaytime, setSelectedPlaytime] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [selectedPlayerCount, setSelectedPlayerCount] = useState<PlayerCountOption>("any");
  const [soldByOKG, setSoldByOKG] = useState<boolean>(false);
  const [selectedCoop, setSelectedCoop] = useState<CoopFilterOption>("all");

  /**
   * Toggles a category selection on or off.
   */
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

  /**
   * Removes a specific category from the selection.
   */
  const removeCategory = (categoryToRemove: string) => {
    console.log("removeCategory called with:", categoryToRemove);

    setSelectedCategories(prevCategories => {
      const newCategories = prevCategories.filter(cat => cat !== categoryToRemove);
      console.log("After removal, categories:", newCategories);
      return newCategories;
    });
  };

  /**
   * Resets all filters to their default states.
   */
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedPlaytime("all");
    setSearch("");
    setSelectedPlayerCount("any");
    setSoldByOKG(false);
    setSelectedCoop("all");
  };

  /**
   * Checks if a game falls within a specific playtime group.
   */
  function isInPlaytimeGroup(game: Game, group: string) {
    const pt = game.playtime_minutes ?? 0;
    if (group === "quick") return pt >= 0 && pt <= 30;
    if (group === "standard") return pt >= 31 && pt <= 60;
    if (group === "extended") return pt >= 61 && pt <= 120;
    if (group === "epic") return pt > 120;
    return true; // For "all"
  }

  /**
   * Checks if a game supports the selected player count.
   */
  function meetsPlayerCount(game: Game, count: PlayerCountOption): boolean {
    if (count === "any") return true;
    if (count === "5+") return game.max_players >= 5;
    const numPlayers = parseInt(count);
    return numPlayers >= game.min_players && numPlayers <= game.max_players;
  }

  const sortedAndFilteredGames = useMemo(() => {
    console.log("Recomputing sorted games with:", {
      sortBy,
      sortDirection,
      selectedPlaytime,
      search,
      selectedPlayerCount,
      selectedCategories,
      soldByOKG,
      selectedCoop
    });

    if (allGames.length > 0) {
      // console.log("First game sold_by_okg:", allGames[0].name, allGames[0].sold_by_okg);
    }

    let filteredGames = [...allGames]
      .filter(game =>
        (selectedCategories.length === 0 ||
          selectedCategories.every(cat => game.category.includes(cat)))
        && (selectedPlaytime === "all" || isInPlaytimeGroup(game, selectedPlaytime))
        && (search.trim() === "" ||
          game.name.toLowerCase().includes(search.toLowerCase()))
        && (selectedPlayerCount === "any" || meetsPlayerCount(game, selectedPlayerCount))
        && (!soldByOKG || game.sold_by_okg)
        && (selectedCoop === "all" || (selectedCoop === "coop" ? game.coop : !game.coop))
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
  }, [allGames, selectedCategories, selectedPlaytime, sortBy, sortDirection, search, selectedPlayerCount, soldByOKG, selectedCoop]);

  return {
    filterState: {
      selectedCategories,
      sortBy,
      sortDirection,
      selectedPlaytime,
      search,
      selectedPlayerCount,
      soldByOKG,
      selectedCoop,
    },
    sortedAndFilteredGames,
    handlers: {
      setSelectedCategories,
      setSortBy,
      setSortDirection,
      setSelectedPlaytime,
      setSearch,
      setSelectedPlayerCount,
      handleCategoryToggle,
      removeCategory,
      resetFilters,
      setSoldByOKG,
      setSelectedCoop,
    },
  };
};
