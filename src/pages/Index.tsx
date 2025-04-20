import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Repeat, GraduationCap, Filter } from "lucide-react";
import { useState } from "react";
import games from "../../data/games.json";
import categories from "../../data/game_categories.json";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredGames = games.filter(game => 
    selectedCategories.length === 0 || 
    game.category.some(cat => selectedCategories.includes(cat))
  );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Board Game Library</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map((category) => (
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
        </div>
        <ScrollArea className="h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
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
