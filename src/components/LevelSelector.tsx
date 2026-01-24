import { useAuth } from '@/context/AuthContext';
import { getDifficultyForLevel } from '@/data/questions';
import { Lock, Star, Check } from 'lucide-react';

interface LevelSelectorProps {
  categoryId: string;
  onSelectLevel: (level: number) => void;
}

export function LevelSelector({ categoryId, onSelectLevel }: LevelSelectorProps) {
  const { userProgress } = useAuth();
  const progress = userProgress?.categoryProgress[categoryId];
  const unlockedLevel = progress?.unlockedLevel || 1;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-emerald-600';
      case 'medium': return 'from-yellow-500 to-orange-600';
      case 'hard': return 'from-red-500 to-rose-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const levels = Array.from({ length: 50 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
      {levels.map((level) => {
        const isUnlocked = level <= unlockedLevel;
        const isCompleted = progress?.scores[level] !== undefined && progress.scores[level] >= 50;
        const score = progress?.scores[level];
        const difficulty = getDifficultyForLevel(level);

        return (
          <button
            key={level}
            onClick={() => isUnlocked && onSelectLevel(level)}
            disabled={!isUnlocked}
            className={`
              relative aspect-square rounded-xl border-2 font-gaming text-lg font-bold
              transition-all duration-300 overflow-hidden group
              ${isUnlocked 
                ? 'border-primary/50 hover:border-primary hover:scale-110 cursor-pointer' 
                : 'border-muted/30 cursor-not-allowed opacity-50 grayscale'
              }
              ${isCompleted ? 'bg-gradient-to-br from-primary/20 to-primary/10' : 'bg-card'}
            `}
          >
            {/* Difficulty indicator */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getDifficultyColor(difficulty)}`} />
            
            {/* Level number or lock */}
            <div className="absolute inset-0 flex items-center justify-center">
              {isUnlocked ? (
                <span className={isCompleted ? 'text-primary' : 'text-foreground'}>
                  {level}
                </span>
              ) : (
                <Lock className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            {/* Completed indicator */}
            {isCompleted && (
              <div className="absolute bottom-1 right-1">
                <Star className="h-3 w-3 text-accent fill-accent" />
              </div>
            )}

            {/* Score tooltip on hover */}
            {score !== undefined && isUnlocked && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover border border-border rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Best: {score}%
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
