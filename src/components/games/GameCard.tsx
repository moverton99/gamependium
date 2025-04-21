
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Repeat, GraduationCap, Clock, Users, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { DetailedGameCard } from "./DetailedGameCard";
import { categoryDescriptionMap } from "./categoryDescriptions";

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
}

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
}: GameCardProps) => {
  const [isDetailedViewOpen, setIsDetailedViewOpen] = useState(false);
  const selectedPlayerCount = window.selectedPlayerCount || "any";
  
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
    <>
      <Card 
        className="p-6 hover:shadow-lg transition-shadow cursor-pointer" 
        onClick={() => setIsDetailedViewOpen(true)}
      >
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <div className="flex gap-4 mb-4 text-gray-600">
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
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Tooltip key={cat}>
              <TooltipTrigger asChild>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full cursor-help">
                  {cat}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {categoryDescriptionMap[cat] || "No description found"}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </Card>

      <DetailedGameCard
        isOpen={isDetailedViewOpen}
        onClose={() => setIsDetailedViewOpen(false)}
        name={name}
        learningCurveRank={learningCurveRank}
        learningCurveDesc={learningCurveDesc}
        strategicDepthRank={strategicDepthRank}
        strategicDepthDesc={strategicDepthDesc}
        replayabilityRank={replayabilityRank}
        replayabilityDesc={replayabilityDesc}
        description={description}
        categories={categories}
        playtimeMinutes={playtimeMinutes}
        minPlayers={minPlayers}
        maxPlayers={maxPlayers}
        suggestedMinPlayers={suggestedMinPlayers}
        playersDesc={playersDesc}
      />
    </>
  );
};

