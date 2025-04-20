
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Repeat, GraduationCap } from "lucide-react";

interface GameCardProps {
  name: string;
  learningCurveRank: number;
  learningCurveDesc: string;
  strategicDepthRank: number;
  strategicDepthDesc: string;
  replayabilityRank: number;
  replayabilityDesc: string;
  description: string;
  categories: string[];
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
}: GameCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
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
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span key={cat} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {cat}
          </span>
        ))}
      </div>
    </Card>
  );
};
