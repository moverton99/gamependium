
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, Repeat, GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailedGameCardProps {
  name: string;
  learningCurveRank: number;
  learningCurveDesc: string;
  strategicDepthRank: number;
  strategicDepthDesc: string;
  replayabilityRank: number;
  replayabilityDesc: string;
  description: string;
  categories: string[];
  isOpen: boolean;
  onClose: () => void;
  gameplayStyle: string;
}

export const DetailedGameCard = ({
  name,
  learningCurveRank,
  learningCurveDesc,
  strategicDepthRank,
  strategicDepthDesc,
  replayabilityRank,
  replayabilityDesc,
  description,
  categories,
  gameplayStyle,
  isOpen,
  onClose,
}: DetailedGameCardProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row justify-between items-start">
          <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="text-lg font-semibold">Description</div>
            <p className="text-gray-700">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <GraduationCap className="w-5 h-5" />
                <span>Learning Curve</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{learningCurveRank}/100</span>
                <p className="text-sm text-gray-600">{learningCurveDesc}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Brain className="w-5 h-5" />
                <span>Strategic Depth</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{strategicDepthRank}/100</span>
                <p className="text-sm text-gray-600">{strategicDepthDesc}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Repeat className="w-5 h-5" />
                <span>Replayability</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{replayabilityRank}/100</span>
                <p className="text-sm text-gray-600">{replayabilityDesc}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">Gameplay Style</div>
            <p className="text-gray-700">{gameplayStyle}</p>
          </div>

          <div className="space-y-2">
            <div className="font-semibold">Categories</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
