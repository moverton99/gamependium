
import { cn } from "@/lib/utils";
import { GameGrid } from "@/components/games/GameGrid";
import { Game } from "@/types/game";
import { PlayerCountOption } from "@/components/games/PlayerCountFilter";

interface GameContainerProps {
  games: Game[];
  selectedPlayerCount: PlayerCountOption;
  isInIframe: boolean;
}

export const GameContainer = ({ games, selectedPlayerCount, isInIframe }: GameContainerProps) => {
  return (
    <div className={cn(
      "flex-grow overflow-hidden", 
      isInIframe ? "max-h-[calc(100vh-250px)]" : ""
    )}>
      <GameGrid games={games} selectedPlayerCount={selectedPlayerCount} />
    </div>
  );
};
