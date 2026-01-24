import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/data/questions';
import { Trophy, Star, Target, TrendingUp, Medal, Crown, Award } from 'lucide-react';

export default function Dashboard() {
  const { userProgress, user } = useAuth();

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'Legend': return <Crown className="h-8 w-8 text-yellow-400" />;
      case 'Master': return <Medal className="h-8 w-8 text-purple-400" />;
      case 'Expert': return <Award className="h-8 w-8 text-blue-400" />;
      default: return <Trophy className="h-8 w-8 text-primary" />;
    }
  };

  const getRankProgress = () => {
    const points = userProgress?.totalPoints || 0;
    if (points >= 5000) return { current: 'Legend', next: null, progress: 100, toNext: 0 };
    if (points >= 2500) return { current: 'Master', next: 'Legend', progress: ((points - 2500) / 2500) * 100, toNext: 5000 - points };
    if (points >= 1000) return { current: 'Expert', next: 'Master', progress: ((points - 1000) / 1500) * 100, toNext: 2500 - points };
    if (points >= 500) return { current: 'Advanced', next: 'Expert', progress: ((points - 500) / 500) * 100, toNext: 1000 - points };
    return { current: 'Beginner', next: 'Advanced', progress: (points / 500) * 100, toNext: 500 - points };
  };

  const rankInfo = getRankProgress();

  const categoryStats = categories.map(cat => {
    const progress = userProgress?.categoryProgress[cat.id];
    const completedLevels = (progress?.unlockedLevel || 1) - 1;
    const totalStars = Object.values(progress?.scores || {}).filter(s => s >= 50).length;
    const avgScore = Object.values(progress?.scores || {}).length > 0
      ? Math.round(Object.values(progress.scores).reduce((a, b) => a + b, 0) / Object.values(progress.scores).length)
      : 0;

    return {
      ...cat,
      completedLevels,
      totalStars,
      avgScore,
      unlockedLevel: progress?.unlockedLevel || 1,
    };
  });

  const totalCompleted = categoryStats.reduce((acc, cat) => acc + cat.completedLevels, 0);
  const totalStars = categoryStats.reduce((acc, cat) => acc + cat.totalStars, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <h1 className="font-gaming text-3xl font-bold mb-8">Your Dashboard</h1>

        {/* Profile Card */}
        <div className="gaming-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar & Rank */}
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 mx-auto pulse-glow">
                {getRankIcon(userProgress?.rank || 'Beginner')}
              </div>
              <h2 className="font-gaming text-xl font-bold">{user?.username}</h2>
              <p className="text-primary font-gaming">{userProgress?.rank || 'Beginner'}</p>
            </div>

            {/* Stats */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="gaming-card p-4 text-center">
                <Trophy className="h-6 w-6 text-accent mx-auto mb-2" />
                <div className="font-gaming text-2xl font-bold">{userProgress?.totalPoints || 0}</div>
                <div className="text-sm text-muted-foreground">Total Points</div>
              </div>
              <div className="gaming-card p-4 text-center">
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <div className="font-gaming text-2xl font-bold">{totalCompleted}</div>
                <div className="text-sm text-muted-foreground">Levels Done</div>
              </div>
              <div className="gaming-card p-4 text-center">
                <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <div className="font-gaming text-2xl font-bold">{totalStars}</div>
                <div className="text-sm text-muted-foreground">Stars Earned</div>
              </div>
              <div className="gaming-card p-4 text-center">
                <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                <div className="font-gaming text-2xl font-bold">{categories.length}</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>

          {/* Rank Progress */}
          {rankInfo.next && (
            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress to {rankInfo.next}</span>
                <span className="text-sm font-medium">{rankInfo.toNext} points to go</span>
              </div>
              <div className="progress-bar h-3">
                <div 
                  className="progress-fill"
                  style={{ width: `${rankInfo.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Category Performance */}
        <h2 className="font-gaming text-xl font-bold mb-4">Category Performance</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((cat) => (
            <div key={cat.id} className="gaming-card p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`category-icon bg-gradient-to-br ${cat.color} w-12 h-12`}>
                  <span className="text-2xl">{cat.icon}</span>
                </div>
                <div>
                  <h3 className="font-gaming font-bold">{cat.name}</h3>
                  <p className="text-sm text-muted-foreground">Level {cat.unlockedLevel} unlocked</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="font-medium">{cat.completedLevels}/{cat.totalLevels}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(cat.completedLevels / cat.totalLevels) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">{cat.totalStars} stars</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Avg: {cat.avgScore}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
