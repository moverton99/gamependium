
import { ScrollArea } from "@/components/ui/scroll-area";
import { GameCard } from "./GameCard";
import { Game } from "@/types/game";
import type { GameGridProps } from "./GameGrid.d.ts";

export const GameGrid = ({ games }: GameGridProps) => {
  return (
    <ScrollArea className="h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard
            key={game.name}
            name={game.name}
            learningCurveRank={game.learning_curve_rank}
            learningCurveDesc={game.learning_curve_desc}
            strategicDepthRank={game.strategic_depth_rank}
            strategicDepthDesc={game.strategic_depth_desc}
            replayabilityRank={game.replayability_rank}
            replayabilityDesc={game.replayability_desc}
            description={game.description}
            categories={game.category}
            gameplayStyle={game.gameplay_style || ""}
            playtimeMinutes={game.playtime_minutes}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
