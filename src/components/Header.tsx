import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Trophy, User, Settings, Home } from 'lucide-react';

export function Header() {
  const { user, logout, userProgress } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Legend': return 'text-yellow-400';
      case 'Master': return 'text-purple-400';
      case 'Expert': return 'text-blue-400';
      case 'Advanced': return 'text-green-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-gaming text-xl font-bold tracking-wider"
          >
            <span className="text-primary glow-text">QUIZ</span>
            <span className="text-accent">MASTER</span>
          </button>

          <nav className="hidden md:flex items-center gap-4">
            <Button
              variant={location.pathname === '/' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate('/')}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
            <Button
              variant={location.pathname === '/dashboard' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <Trophy className="h-4 w-4" />
              Dashboard
            </Button>
            {user?.isAdmin && (
              <Button
                variant={location.pathname === '/admin' ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => navigate('/admin')}
                className="gap-2"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/50">
            <Trophy className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">{userProgress?.totalPoints || 0} pts</span>
            <span className={`text-sm font-gaming ${getRankColor(userProgress?.rank || 'Beginner')}`}>
              {userProgress?.rank || 'Beginner'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{user?.username}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
