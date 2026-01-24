import { useState, useEffect } from 'react';
import { Question, QuizResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Timer, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface QuizGameProps {
  questions: Question[];
  level: number;
  onComplete: (result: QuizResult) => void;
  onExit: () => void;
}

export function QuizGame({ questions, level, onComplete, onExit }: QuizGameProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, currentQuestion]);

  const handleTimeUp = () => {
    if (selectedAnswer === null) {
      setSelectedAnswer(-1);
      setAnswers([...answers, -1]);
      setShowFeedback(true);
      setIsTimerActive(false);
    }
  };

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    
    setAnswers([...answers, selectedAnswer]);
    setShowFeedback(true);
    setIsTimerActive(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(30);
      setIsTimerActive(true);
    } else {
      // Quiz complete
      const finalAnswers = [...answers, selectedAnswer!];
      const correctCount = finalAnswers.filter(
        (ans, idx) => ans === questions[idx].correctAnswer
      ).length;
      
      const result: QuizResult = {
        score: Math.round((correctCount / questions.length) * 100),
        totalQuestions: questions.length,
        percentage: Math.round((correctCount / questions.length) * 100),
        passed: (correctCount / questions.length) >= 0.5,
        correctAnswers: questions.map((q) => q.correctAnswer),
        userAnswers: finalAnswers,
      };
      
      onComplete(result);
    }
  };

  const getOptionClass = (index: number) => {
    const baseClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300";
    
    if (!showFeedback) {
      if (selectedAnswer === index) {
        return `${baseClass} border-primary bg-primary/10 text-foreground`;
      }
      return `${baseClass} border-border hover:border-primary/50 hover:bg-muted/50`;
    }
    
    // Show feedback
    if (index === question.correctAnswer) {
      return `${baseClass} border-success bg-success/10 text-success`;
    }
    if (selectedAnswer === index && index !== question.correctAnswer) {
      return `${baseClass} border-destructive bg-destructive/10 text-destructive`;
    }
    return `${baseClass} border-border/50 opacity-50`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="font-gaming text-lg text-primary">Level {level}</span>
          <span className="px-3 py-1 rounded-full bg-muted text-sm font-medium capitalize">
            {question.difficulty}
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={onExit}>
          Exit Quiz
        </Button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex items-center gap-2">
            <Timer className={`h-4 w-4 ${timeLeft <= 10 ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
            <span className={timeLeft <= 10 ? 'text-destructive font-bold' : ''}>{timeLeft}s</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="gaming-card p-8 mb-6">
        <h2 className="text-xl font-semibold mb-6">{question.text}</h2>
        
        <div className="space-y-3 relative z-20">
          {question.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectAnswer(index)}
              disabled={showFeedback}
              className={`${getOptionClass(index)} cursor-pointer`}
            >
              <div className="flex items-center gap-3 pointer-events-none">
                <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center font-gaming text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showFeedback && index === question.correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                )}
                {showFeedback && selectedAnswer === index && index !== question.correctAnswer && (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showFeedback ? (
          <Button 
            onClick={handleConfirm} 
            disabled={selectedAnswer === null}
            className="btn-gaming px-8"
          >
            Confirm Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="btn-gaming px-8 gap-2">
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
