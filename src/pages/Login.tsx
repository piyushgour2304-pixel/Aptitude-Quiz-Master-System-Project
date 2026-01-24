import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Brain, Zap, Trophy, Target } from 'lucide-react';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(loginEmail, loginPassword);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "Ready to challenge your brain?",
      });
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await register(regUsername, regEmail, regPassword);
    
    if (success) {
      toast({
        title: "Account created!",
        description: "Welcome to Quiz Master!",
      });
      navigate('/');
    } else {
      toast({
        title: "Registration failed",
        description: "Email already exists",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-12 flex-col justify-between">
        <div>
          <h1 className="font-gaming text-4xl font-bold mb-2">
            <span className="text-primary glow-text">QUIZ</span>
            <span className="text-accent"> MASTER</span>
          </h1>
          <p className="text-muted-foreground">Challenge your mind, level up your skills</p>
        </div>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-gaming font-bold mb-1">5 Categories</h3>
              <p className="text-sm text-muted-foreground">From math to puzzles, test every aspect of your aptitude</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-gaming font-bold mb-1">50 Levels Each</h3>
              <p className="text-sm text-muted-foreground">Progressive difficulty from easy to expert</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-gaming font-bold mb-1">Unlock & Progress</h3>
              <p className="text-sm text-muted-foreground">Score 50%+ to unlock the next level</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
              <Trophy className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="font-gaming font-bold mb-1">Compete & Rank</h3>
              <p className="text-sm text-muted-foreground">Track your progress and climb the leaderboard</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          © 2024 Quiz Master. Train your brain daily.
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <h1 className="font-gaming text-3xl font-bold mb-2">
              <span className="text-primary glow-text">QUIZ</span>
              <span className="text-accent"> MASTER</span>
            </h1>
            <p className="text-muted-foreground">Challenge your mind</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="font-gaming">Login</TabsTrigger>
              <TabsTrigger value="register" className="font-gaming">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <div className="gaming-card p-6">
                <h2 className="font-gaming text-xl font-bold mb-6">Welcome Back</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <Button type="submit" className="w-full btn-gaming" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="register">
              <div className="gaming-card p-6">
                <h2 className="font-gaming text-xl font-bold mb-6">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-username">Username</Label>
                    <Input
                      id="reg-username"
                      type="text"
                      placeholder="YourUsername"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="you@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      className="bg-input border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="••••••••"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-input border-border"
                    />
                  </div>
                  <Button type="submit" className="w-full btn-gaming" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
