export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Level {
  id: number;
  categoryId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  isUnlocked: boolean;
  bestScore: number;
  attempts: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  totalLevels: number;
  completedLevels: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  correctAnswers: number[];
  userAnswers: number[];
}

export interface UserProgress {
  userId: string;
  categoryProgress: {
    [categoryId: string]: {
      unlockedLevel: number;
      scores: { [levelId: number]: number };
    };
  };
  totalPoints: number;
  rank: string;
}
