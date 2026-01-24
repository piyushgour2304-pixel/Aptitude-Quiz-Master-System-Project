import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { LevelSelector } from '@/components/LevelSelector';
import { QuizGame } from '@/components/QuizGame';
import { ResultModal } from '@/components/ResultModal';
import { categories, getQuestionsForLevel, getDifficultyForLevel } from '@/data/questions';
import { useAuth } from '@/context/AuthContext';
import { QuizResult } from '@/types/quiz';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Star, Lock } from 'lucide-react';

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { userProgress, updateProgress } = useAuth();
  
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-gaming text-2xl mb-4">Category not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const progress = userProgress?.categoryProgress[categoryId!];
  const unlockedLevel = progress?.unlockedLevel || 1;

  const handleSelectLevel = (level: number) => {
    const levelQuestions = getQuestionsForLevel(categoryId!, level);
    setQuestions(levelQuestions);
    setSelectedLevel(level);
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setShowResult(true);

    // Update progress
    if (userProgress && categoryId) {
      const currentProgress = { ...userProgress };
      const categoryProgress = currentProgress.categoryProgress[categoryId];
      
      // Update best score for this level
      const currentBest = categoryProgress.scores[selectedLevel!] || 0;
      if (result.percentage > currentBest) {
        categoryProgress.scores[selectedLevel!] = result.percentage;
      }

      // Unlock next level if passed
      if (result.passed && selectedLevel! >= categoryProgress.unlockedLevel) {
        categoryProgress.unlockedLevel = selectedLevel! + 1;
        toast({
          title: "🎉 Level Unlocked!",
          description: `You've unlocked Level ${selectedLevel! + 1}!`,
        });
      }

      // Update rank based on total points
      const newPoints = result.passed ? currentProgress.totalPoints + result.percentage : currentProgress.totalPoints;
      currentProgress.totalPoints = newPoints;
      
      if (newPoints >= 5000) currentProgress.rank = 'Legend';
      else if (newPoints >= 2500) currentProgress.rank = 'Master';
      else if (newPoints >= 1000) currentProgress.rank = 'Expert';
      else if (newPoints >= 500) currentProgress.rank = 'Advanced';
      else currentProgress.rank = 'Beginner';

      updateProgress(currentProgress);
    }
  };

  const handleRetry = () => {
    setShowResult(false);
    setQuizResult(null);
    const levelQuestions = getQuestionsForLevel(categoryId!, selectedLevel!);
    setQuestions(levelQuestions);
  };

  const handleNextLevel = () => {
    setShowResult(false);
    setQuizResult(null);
    if (selectedLevel! < 50) {
      handleSelectLevel(selectedLevel! + 1);
    }
  };

  const handleExitQuiz = () => {
    setSelectedLevel(null);
    setQuestions([]);
  };

  // Show quiz if level is selected
  if (selectedLevel && questions.length > 0 && !showResult) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container px-4 py-8">
          <QuizGame
            questions={questions}
            level={selectedLevel}
            onComplete={handleQuizComplete}
            onExit={handleExitQuiz}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </Button>

        {/* Category Header */}
        <div className="gaming-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className={`category-icon bg-gradient-to-br ${category.color} w-20 h-20`}>
              <span className="text-4xl">{category.icon}</span>
            </div>
            <div className="flex-1">
              <h1 className="font-gaming text-3xl font-bold mb-2">{category.name}</h1>
              <p className="text-muted-foreground mb-4">{category.description}</p>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm">{category.totalLevels} Levels</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                  <Star className="h-4 w-4 text-accent" />
                  <span className="text-sm">
                    {Object.values(progress?.scores || {}).filter(s => s >= 50).length} Stars
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Level {unlockedLevel} Unlocked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Legend */}
        <div className="flex items-center gap-6 mb-6">
          <span className="text-sm text-muted-foreground">Difficulty:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-gradient-to-r from-green-500 to-emerald-600" />
            <span className="text-sm">Easy (1-15)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-gradient-to-r from-yellow-500 to-orange-600" />
            <span className="text-sm">Medium (16-35)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded bg-gradient-to-r from-red-500 to-rose-600" />
            <span className="text-sm">Hard (36-50)</span>
          </div>
        </div>

        {/* Level Grid */}
        <div className="gaming-card p-6">
          <h2 className="font-gaming text-xl font-bold mb-6">Select Level</h2>
          <LevelSelector 
            categoryId={categoryId!} 
            onSelectLevel={handleSelectLevel}
          />
        </div>
      </main>

      {/* Result Modal */}
      {quizResult && (
        <ResultModal
          isOpen={showResult}
          result={quizResult}
          level={selectedLevel!}
          categoryName={category.name}
          onRetry={handleRetry}
          onNextLevel={handleNextLevel}
          onClose={() => {
            setShowResult(false);
            setSelectedLevel(null);
          }}
        />
      )}
    </div>
  );
}
