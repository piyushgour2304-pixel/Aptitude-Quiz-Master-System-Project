import { QuizResult } from '@/types/quiz';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, ArrowRight, Star, Target, Zap } from 'lucide-react';

interface ResultModalProps {
  result: QuizResult;
  level: number;
  categoryName: string;
  onRetry: () => void;
  onNextLevel: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export function ResultModal({ 
  result, 
  level, 
  categoryName, 
  onRetry, 
  onNextLevel, 
  onClose,
  isOpen 
}: ResultModalProps) {
  const getScoreColor = () => {
    if (result.percentage >= 80) return 'text-success';
    if (result.percentage >= 50) return 'text-primary';
    return 'text-destructive';
  };

  const getMessage = () => {
    if (result.percentage >= 80) return { title: 'Excellent!', subtitle: 'Outstanding performance!' };
    if (result.percentage >= 50) return { title: 'Good Job!', subtitle: 'You passed the level!' };
    return { title: 'Keep Trying!', subtitle: 'You need 50% to pass.' };
  };

  const message = getMessage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md gaming-card border-primary/30">
        <DialogHeader>
          <DialogTitle className="text-center font-gaming text-2xl">
            {message.title}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center py-6">
          {/* Score display */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center">
              <div className="text-center">
                <div className={`font-gaming text-4xl font-bold ${getScoreColor()}`}>
                  {result.percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
            </div>
            {result.passed && (
              <div className="absolute -top-2 -right-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Star className="h-5 w-5 text-accent-foreground fill-current" />
                </div>
              </div>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{message.subtitle}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="gaming-card p-3">
              <Target className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="font-bold">{result.userAnswers.filter((a, i) => a === result.correctAnswers[i]).length}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            <div className="gaming-card p-3">
              <Zap className="h-5 w-5 text-accent mx-auto mb-1" />
              <div className="font-bold">{result.totalQuestions}</div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div className="gaming-card p-3">
              <Trophy className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
              <div className="font-bold">+{result.passed ? result.percentage : 0}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          </div>

          {/* Level info */}
          <div className="text-sm text-muted-foreground mb-6">
            <span className="font-gaming text-primary">{categoryName}</span>
            <span className="mx-2">•</span>
            <span>Level {level}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {!result.passed ? (
              <Button onClick={onRetry} className="btn-gaming gap-2">
                <RotateCcw className="h-4 w-4" />
                Retry Level
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={onClose}>
                  Back to Levels
                </Button>
                {level < 50 && (
                  <Button onClick={onNextLevel} className="btn-gaming gap-2">
                    Next Level
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
