
import { GameCard } from "./GameCard";
import { GameGridProps } from "./GameGrid.d";
import { PlayerCountOption } from "./PlayerCountFilter";

interface ExtendedGameGridProps extends GameGridProps {
  selectedPlayerCount: PlayerCountOption;
}

export const GameGrid = ({ games, selectedPlayerCount }: ExtendedGameGridProps) => {
  return (
    <div className="h-full w-full overflow-y-auto pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-8">
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
            playtimeMinutes={game.playtime_minutes}
            minPlayers={game.min_players}
            maxPlayers={game.max_players}
            suggestedMinPlayers={game.suggested_min_players}
            playersDesc={game.players_desc}
            selectedPlayerCount={selectedPlayerCount}
          />
        ))}
      </div>
    </div>
  );
};
