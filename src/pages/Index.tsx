
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Repeat, GraduationCap, Filter, X, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import games from "../../data/games.json";
import categories from "../../data/game_categories.json";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = "name" | "learning_curve" | "strategic_depth" | "replayability";

const Index = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const removeCategory = (categoryToRemove: string) => {
    setSelectedCategories(old => old.filter(cat => cat !== categoryToRemove));
  };

  // Sort categories alphabetically before rendering
  const sortedCategories = [...categories].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  const handleSortChange = (value: SortOption) => {
    if (value === sortBy) {
      // Toggle direction if clicking the same sort option
      setSortDirection(current => current === "asc" ? "desc" : "asc");
    } else {
      // Reset to ascending when changing sort option
      setSortBy(value);
      setSortDirection("asc");
    }
  };

  const sortedAndFilteredGames = [...games]
    .filter(game => 
      selectedCategories.length === 0 || 
      selectedCategories.every(cat => game.category.includes(cat))
    )
    .sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      
      if (sortBy === "name") {
        return multiplier * a.name.localeCompare(b.name);
      } else {
        const valueA = Number(a[`${sortBy}_rank`]);
        const valueB = Number(b[`${sortBy}_rank`]);
        return multiplier * (valueA - valueB);
      }
    });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Board Game Library</h1>
        <div className="flex items-center gap-3 mb-8">
          <div className="flex flex-wrap items-center gap-3 flex-grow">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter by Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {sortedCategories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category.name}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={(checked) => {
                      setSelectedCategories(old => 
                        checked
                          ? [...old, category.name]
                          : old.filter(cat => cat !== category.name)
                      );
                    }}
                  >
                    {category.name}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {selectedCategories.map((category) => (
              <div 
                key={category}
                className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {category}
                <button
                  onClick={() => removeCategory(category)}
                  className="hover:bg-primary/20 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <ArrowUpDown className={`h-4 w-4 transition-transform ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                <SelectValue placeholder="Sort by..." />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="learning_curve">Learning Curve</SelectItem>
              <SelectItem value="strategic_depth">Strategic Depth</SelectItem>
              <SelectItem value="replayability">Replayability</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ScrollArea className="h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedAndFilteredGames.map((game) => (
              <Card key={game.name} className="p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{game.name}</h2>
                <div className="flex gap-4 mb-4 text-gray-600">
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>{game.learning_curve_rank}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Learning Curve: {game.learning_curve_desc}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1">
                      <Brain className="w-4 h-4" />
                      <span>{game.strategic_depth_rank}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Strategic Depth: {game.strategic_depth_desc}</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-1">
                      <Repeat className="w-4 h-4" />
                      <span>{game.replayability_rank}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Replayability: {game.replayability_desc}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                <div className="flex flex-wrap gap-2">
                  {game.category.map((cat) => (
                    <span 
                      key={cat} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
