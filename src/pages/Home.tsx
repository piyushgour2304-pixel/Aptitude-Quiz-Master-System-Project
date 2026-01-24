import { Header } from '@/components/Header';
import { CategoryCard } from '@/components/CategoryCard';
import { categories } from '@/data/questions';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Target, Trophy, Flame } from 'lucide-react';

export default function Home() {
  const { userProgress } = useAuth();

  const totalCompleted = Object.values(userProgress?.categoryProgress || {}).reduce(
    (acc, cat) => acc + (cat.unlockedLevel - 1),
    0
  );

  const totalStars = Object.values(userProgress?.categoryProgress || {}).reduce(
    (acc, cat) => acc + Object.values(cat.scores).filter(s => s >= 50).length,
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Welcome back, challenger!</span>
          </div>
          <h1 className="font-gaming text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-primary glow-text">Challenge</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master all categories to become the ultimate Quiz Master. 
            Complete levels, earn stars, and climb the rankings!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="gaming-card p-4 text-center">
            <Target className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="font-gaming text-2xl font-bold">{totalCompleted}</div>
            <div className="text-sm text-muted-foreground">Levels Complete</div>
          </div>
          <div className="gaming-card p-4 text-center">
            <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="font-gaming text-2xl font-bold">{totalStars}</div>
            <div className="text-sm text-muted-foreground">Stars Earned</div>
          </div>
          <div className="gaming-card p-4 text-center">
            <Flame className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="font-gaming text-2xl font-bold">{userProgress?.totalPoints || 0}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
          <div className="gaming-card p-4 text-center">
            <Sparkles className="h-6 w-6 text-secondary mx-auto mb-2" />
            <div className="font-gaming text-2xl font-bold text-secondary">{userProgress?.rank || 'Beginner'}</div>
            <div className="text-sm text-muted-foreground">Current Rank</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
