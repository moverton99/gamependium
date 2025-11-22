import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Repeat, GraduationCap, Clock, Users, AlertTriangle, ShoppingBag, Handshake } from "lucide-react";
import { PlayerCountOption } from "./PlayerCountFilter";
import { useData } from "@/contexts/DataContext";

import { CommentaryAndAlternatives } from "@/types/game";

interface GameCardProps {
  name: string;
  learningCurveRank: number;
  learningCurveDesc: string;
  strategicDepthRank: number;
  strategicDepthDesc: string;
  replayabilityRank: number | string;
  replayabilityDesc: string;
  description: string;
  categories: string[];
  playtimeMinutes: number;
  minPlayers: number;
  maxPlayers: number;
  suggestedMinPlayers: number;
  playersDesc: string;
  selectedPlayerCount: PlayerCountOption;
  soldByOKG: boolean;
  coop: boolean;
  commentaryAndAlternatives?: CommentaryAndAlternatives;
  onOpen: () => void;
}

/**
 * Displays a summary card for a single game.
 * Shows key metrics (learning curve, depth, etc.) and allows opening a detailed view.
 */
export const GameCard = ({
  name,
  learningCurveRank,
  learningCurveDesc,
  strategicDepthRank,
  strategicDepthDesc,
  replayabilityRank,
  replayabilityDesc,
  description,
  categories,
  playtimeMinutes,
  minPlayers,
  maxPlayers,
  suggestedMinPlayers,
  playersDesc,
  selectedPlayerCount,
  soldByOKG,
  coop,
  onOpen,
}: GameCardProps) => {
  const { categoryDescriptionMap } = useData();

  let showWarningTriangle = false;

  if (
    selectedPlayerCount !== "any" &&
    selectedPlayerCount !== "5+"
  ) {
    const selectedCount = parseInt(selectedPlayerCount);

    showWarningTriangle =
      selectedCount >= minPlayers &&
      selectedCount < suggestedMinPlayers;
  }

  return (
    <Card
      className="p-6 bg-[hsl(var(--brand-darkGreen))] text-[hsl(var(--brand-light))] hover:shadow-lg transition-shadow cursor-pointer relative"
      onClick={onOpen}
    >
      <div className="flex justify-between items-start mb-2">
        <h2 className="text-xl font-semibold pr-8">{name}</h2>
        {soldByOKG && (
          <Tooltip>
            <TooltipTrigger>
              <div className="bg-[hsl(var(--brand-orange))] text-[hsl(var(--brand-darkGreen))] p-1.5 rounded-full">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm font-semibold">Sold by OverKnight Games</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="flex gap-4 mb-4 text-[hsl(var(--brand-light))]">
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            <GraduationCap className="w-4 h-4" />
            <span>{learningCurveRank}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Learning Curve: {learningCurveDesc}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            <Brain className="w-4 h-4" />
            <span>{strategicDepthRank}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Strategic Depth: {strategicDepthDesc}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            <Repeat className="w-4 h-4" />
            <span>{replayabilityRank}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Replayability: {replayabilityDesc}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{playtimeMinutes}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Average Playtime: {playtimeMinutes} minutes</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{minPlayers}-{maxPlayers}</span>
            {showWarningTriangle && (
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="w-4 h-4 text-red-500 ml-1" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">Suggested minimum: {suggestedMinPlayers} players</p>
                </TooltipContent>
              </Tooltip>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Players: {minPlayers} to {maxPlayers}</p>
            <p className="text-sm text-gray-500">{playersDesc}</p>
          </TooltipContent>
        </Tooltip>

        {coop && (
          <Tooltip>
            <TooltipTrigger className="flex items-center gap-1">
              <Handshake className="w-4 h-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Coop: a game where players work together as a team toward a shared goal,</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <p className="text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Tooltip key={cat}>
            <TooltipTrigger asChild>
              <span className="px-2 py-1 bg-brand-mustard text-brand-light text-sm rounded-full cursor-help"                >
                {cat}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {categoryDescriptionMap[cat] || "Who knows?"}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Card>
  );
};
