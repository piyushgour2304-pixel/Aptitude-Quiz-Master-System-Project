import { Category } from '@/types/quiz';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Lock, Star } from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const { userProgress } = useAuth();
  const navigate = useNavigate();

  const progress = userProgress?.categoryProgress[category.id];
  const completedLevels = progress?.unlockedLevel ? progress.unlockedLevel - 1 : 0;
  const progressPercent = (completedLevels / category.totalLevels) * 100;

  return (
    <div
      className="gaming-card group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 slide-in"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="relative p-6">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`} />
        
        <div className="relative z-10">
          {/* Icon and title */}
          <div className="flex items-start justify-between mb-4">
            <div className={`category-icon bg-gradient-to-br ${category.color}`}>
              <span className="text-3xl">{category.icon}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <h3 className="font-gaming text-lg font-bold mb-2 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {category.description}
          </p>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">
                {completedLevels}/{category.totalLevels}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium">
                {Object.values(progress?.scores || {}).filter(s => s >= 50).length} Stars
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Level {progress?.unlockedLevel || 1}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
