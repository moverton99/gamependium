
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Brain, Repeat, GraduationCap, Clock, Users, Handshake, BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useData } from "@/contexts/DataContext";
import { CommentaryAndAlternatives } from "@/types/game";
import { CommentaryDialog } from "./CommentaryDialog";
import { Button } from "@/components/ui/button";

interface DetailedGameCardProps {
  name: string;
  learningCurveRank: number;
  learningCurveDesc: string;
  strategicDepthRank: number;
  strategicDepthDesc: string;
  replayabilityRank: number | string;
  replayabilityDesc: string;
  description: string;
  categories: string[];
  isOpen: boolean;
  onClose: () => void;
  playtimeMinutes: number;
  minPlayers: number;
  maxPlayers: number;
  suggestedMinPlayers: number;
  playersDesc: string;
  coop: boolean;
  commentaryAndAlternatives?: CommentaryAndAlternatives;
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
  isOpen,
  onClose,
  playtimeMinutes,
  minPlayers,
  maxPlayers,
  suggestedMinPlayers,
  playersDesc,
  coop,
  commentaryAndAlternatives,
}: DetailedGameCardProps) => {
  const isMobile = useIsMobile();
  const { categoryDescriptionMap } = useData();
  const [isCommentaryOpen, setIsCommentaryOpen] = useState(false);

  const handleCategoryClick = (category: string) => {
    onClose();
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('category', category);
    window.history.pushState(null, '', `?${searchParams.toString()}`);
    window.dispatchEvent(new CustomEvent('categorySelected', { detail: category }));
  };

  // Fix for iOS scrolling issues
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Force layout recalculation on iOS to help with scroll initialization
      setTimeout(() => {
        const scrollContainer = document.querySelector('.scroll-container');
        if (scrollContainer) {
          scrollContainer.scrollTop = 0;
          scrollContainer.scrollTop = 1;
        }
      }, 100);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const headerHeight = isMobile ? 32 : 48;
  const paddingHeight = 20; // Account for padding
  const maxContentHeight = isMobile ?
    `calc(90vh - ${headerHeight}px - ${paddingHeight}px)` :
    `calc(90vh - ${headerHeight}px - ${paddingHeight}px)`;

  // Handle manual close to ensure it works on iOS
  const handleClose = () => {
    // Ensure we call onClose directly
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`max-w-3xl bg-brand-darkGreen text-brand-light ${isMobile ? 'max-h-[90vh]' : 'max-h-[90vh]'}`}
        style={{
          position: 'fixed',
          top: isMobile ? '5%' : '10%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
          maxHeight: isMobile ? '90vh' : '90vh',
          WebkitTapHighlightColor: 'transparent', // Fix for iOS tap highlight issues
        }}
      >
        <DialogHeader className="pb-0.5"> {/* Further reduced padding */}
          <DialogTitle className="text-2xl font-bold text-brand-light">{name}</DialogTitle> {/* Further reduced title size */}
          <DialogDescription className="sr-only">Details about the game {name}</DialogDescription>
        </DialogHeader>

        <div className="flex-grow overflow-hidden">
          <div
            className="scroll-container h-full overflow-y-auto overscroll-contain pb-4 px-4 pt-0.5"
            style={{
              WebkitOverflowScrolling: 'touch',
              maxHeight: maxContentHeight,
              paddingBottom: '60px', // Add extra padding at the bottom to ensure content is visible
            }}
          >
            <div className="space-y-4 pb-8">
              <div className="flex flex-col gap-2">
                <div className="text-lg font-semibold text-brand-light">Description</div>
                <p className="text-brand-light">{description}</p>
                {commentaryAndAlternatives && (
                  <button
                    onClick={() => setIsCommentaryOpen(true)}
                    className="flex items-center gap-2 text-sm text-brand-light hover:underline bg-transparent border-none p-0 cursor-pointer mt-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Commentary & Alternatives</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-brand-light">
                    <GraduationCap className="w-5 h-5" />
                    <span>Learning Curve</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-brand-light">{learningCurveRank}/100</span>
                    <p className="text-sm text-brand-light">{learningCurveDesc}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-brand-light">
                    <Brain className="w-5 h-5" />
                    <span>Strategic Depth</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-brand-light">{strategicDepthRank}/100</span>
                    <p className="text-sm text-brand-light">{strategicDepthDesc}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-brand-light">
                    <Repeat className="w-5 h-5" />
                    <span>Replayability</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-brand-light">{replayabilityRank}/100</span>
                    <p className="text-sm text-brand-light">{replayabilityDesc}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-brand-light">
                    <Users className="w-5 h-5" />
                    <span>Players</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-brand-light">{minPlayers}-{maxPlayers}</span>
                    <p className="text-sm text-brand-light">Suggested min: {suggestedMinPlayers}</p>
                    <p className="text-xs text-brand-light">{playersDesc}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-brand-light">
                    <Clock className="w-5 h-5" />
                    <span>Playtime</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-brand-light">{playtimeMinutes}</span>
                    <p className="text-sm text-brand-light">minutes</p>
                  </div>
                </div>

              </div>

              <div className="space-y-1 pb-4">
                <div className="font-semibold text-brand-light">Categories</div>
                <div className="flex flex-wrap gap-2 pb-6">
                  {categories.map((cat) => (
                    <Tooltip key={cat}>
                      <TooltipTrigger asChild>
                        <span
                          className="px-3 py-1 bg-brand-mustard text-brand-light rounded-full text-sm cursor-pointer hover:bg-purple-200 transition-colors"
                          onClick={() => handleCategoryClick(cat)}
                        >
                          {cat}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {categoryDescriptionMap[cat] || "No description found"}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {coop && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-semibold text-brand-light">
                    <Handshake className="w-5 h-5" />
                    <span>Cooperative</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm text-brand-light">Players work together as a team toward a shared goal</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </DialogContent>


      {
        commentaryAndAlternatives && (
          <CommentaryDialog
            isOpen={isCommentaryOpen}
            onClose={() => setIsCommentaryOpen(false)}
            gameName={name}
            data={commentaryAndAlternatives}
          />
        )
      }
    </Dialog >
  );
};
