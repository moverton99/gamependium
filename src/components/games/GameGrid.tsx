import { useState } from "react";
import { GameCard } from "./GameCard";
import { GameGridProps } from "./GameGrid.d";
import { PlayerCountOption } from "./PlayerCountFilter";
import { DetailedGameCard } from "./DetailedGameCard";
import { Game } from "@/types/game";

interface ExtendedGameGridProps extends GameGridProps {
  selectedPlayerCount: PlayerCountOption;
}

/**
 * Renders a responsive grid of GameCards.
 * Manages the state of the currently selected game for the detailed view.
 */
export const GameGrid = ({ games, selectedPlayerCount }: ExtendedGameGridProps) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleGameSelect = (gameName: string) => {
    const game = games.find((g) => g.name === gameName);
    if (game) {
      setSelectedGame(game);
    }
  };

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
            soldByOKG={game.sold_by_okg}
            coop={game.coop}
            commentaryAndAlternatives={game.commentary_and_alternatives}
            onOpen={() => setSelectedGame(game)}
          />
        ))}
      </div>

      {selectedGame && (
        <DetailedGameCard
          isOpen={!!selectedGame}
          onClose={() => setSelectedGame(null)}
          name={selectedGame.name}
          learningCurveRank={selectedGame.learning_curve_rank}
          learningCurveDesc={selectedGame.learning_curve_desc}
          strategicDepthRank={selectedGame.strategic_depth_rank}
          strategicDepthDesc={selectedGame.strategic_depth_desc}
          replayabilityRank={selectedGame.replayability_rank}
          replayabilityDesc={selectedGame.replayability_desc}
          description={selectedGame.description}
          categories={selectedGame.category}
          playtimeMinutes={selectedGame.playtime_minutes}
          minPlayers={selectedGame.min_players}
          maxPlayers={selectedGame.max_players}
          suggestedMinPlayers={selectedGame.suggested_min_players}
          playersDesc={selectedGame.players_desc}
          coop={selectedGame.coop}
          commentaryAndAlternatives={selectedGame.commentary_and_alternatives}
          onGameSelect={handleGameSelect}
        />
      )}
    </div>
  );
};
