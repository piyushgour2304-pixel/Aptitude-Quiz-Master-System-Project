import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProgress } from '@/types/quiz';

interface AuthContextType {
  user: User | null;
  userProgress: UserProgress | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  updateProgress: (progress: Partial<UserProgress>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultProgress: UserProgress = {
  userId: '',
  categoryProgress: {
    quantitative: { unlockedLevel: 1, scores: {} },
    logical: { unlockedLevel: 1, scores: {} },
    verbal: { unlockedLevel: 1, scores: {} },
    'non-verbal': { unlockedLevel: 1, scores: {} },
    puzzles: { unlockedLevel: 1, scores: {} },
  },
  totalPoints: 0,
  rank: 'Beginner',
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('quizUser');
    const storedProgress = localStorage.getItem('quizProgress');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (storedProgress) {
        setUserProgress(JSON.parse(storedProgress));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('quizUser', JSON.stringify(userWithoutPassword));
      
      const allProgress = JSON.parse(localStorage.getItem('allUserProgress') || '{}');
      const progress = allProgress[foundUser.id] || { ...defaultProgress, userId: foundUser.id };
      setUserProgress(progress);
      localStorage.setItem('quizProgress', JSON.stringify(progress));
      
      return true;
    }
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    
    if (users.some((u: any) => u.email === email)) {
      return false;
    }

    const newUser: User & { password: string } = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      isAdmin: users.length === 0,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('quizUsers', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('quizUser', JSON.stringify(userWithoutPassword));

    const progress = { ...defaultProgress, userId: newUser.id };
    setUserProgress(progress);
    localStorage.setItem('quizProgress', JSON.stringify(progress));
    
    const allProgress = JSON.parse(localStorage.getItem('allUserProgress') || '{}');
    allProgress[newUser.id] = progress;
    localStorage.setItem('allUserProgress', JSON.stringify(allProgress));

    return true;
  };

  const logout = () => {
    setUser(null);
    setUserProgress(null);
    localStorage.removeItem('quizUser');
    localStorage.removeItem('quizProgress');
  };

  const updateProgress = (progress: Partial<UserProgress>) => {
    if (userProgress && user) {
      const newProgress = { ...userProgress, ...progress };
      setUserProgress(newProgress);
      localStorage.setItem('quizProgress', JSON.stringify(newProgress));
      
      const allProgress = JSON.parse(localStorage.getItem('allUserProgress') || '{}');
      allProgress[user.id] = newProgress;
      localStorage.setItem('allUserProgress', JSON.stringify(allProgress));
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProgress, login, logout, register, updateProgress, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
