import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommentaryAndAlternatives } from "@/types/game";
import { useIsMobile } from "@/hooks/use-mobile";

interface CommentaryDialogProps {
    isOpen: boolean;
    onClose: () => void;
    gameName: string;
    data: CommentaryAndAlternatives;
}

export const CommentaryDialog = ({ isOpen, onClose, gameName, data }: CommentaryDialogProps) => {
    const isMobile = useIsMobile();

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-brand-darkGreen text-brand-light border border-brand-orange max-h-[90vh] h-[90vh] flex flex-col overflow-hidden p-0">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl font-bold text-brand-light">Commentary: {gameName}</DialogTitle>
                    <DialogDescription className="sr-only">
                        Detailed commentary and alternatives for {gameName}
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-grow h-full px-6 pb-6">
                    <div className="space-y-6 text-brand-light/90 pr-4">
                        {/* Main Body */}
                        <div className="space-y-4 text-base leading-relaxed">
                            {data.body.split('\n\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Alternatives */}
                        {data.alternatives && data.alternatives.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-brand-orange">Alternatives</h3>
                                <ul className="space-y-4">
                                    {data.alternatives.map((alt, index) => (
                                        <li key={index} className="bg-brand-orange/10 p-3 rounded-md border border-brand-orange/20">
                                            <p>
                                                <strong className="text-brand-mustard">{alt.name}</strong>
                                                <span className="text-brand-light/70 italic"> ({alt.tagline})</span>
                                                : {alt.description}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Verdict */}
                        {data.verdict && (
                            <div className="mt-6 p-4 bg-brand-orange/20 rounded-lg border border-brand-orange">
                                <p className="font-medium">
                                    <strong className="text-brand-mustard">Verdict:</strong> {data.verdict}
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
