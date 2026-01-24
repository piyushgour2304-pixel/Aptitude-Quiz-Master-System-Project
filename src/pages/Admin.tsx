import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { User, UserProgress } from '@/types/quiz';
import { Trash2, Edit, Search, Users, Shield, Trophy } from 'lucide-react';

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<(User & { progress?: UserProgress })[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editUsername, setEditUsername] = useState('');

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    loadUsers();
  }, [user, navigate]);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const allProgress = JSON.parse(localStorage.getItem('allUserProgress') || '{}');
    
    const usersWithProgress = storedUsers.map((u: any) => ({
      ...u,
      progress: allProgress[u.id],
    }));
    
    setUsers(usersWithProgress);
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === user?.id) {
      toast({
        title: "Cannot delete",
        description: "You cannot delete your own account",
        variant: "destructive",
      });
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const updatedUsers = storedUsers.filter((u: any) => u.id !== userId);
    localStorage.setItem('quizUsers', JSON.stringify(updatedUsers));

    const allProgress = JSON.parse(localStorage.getItem('allUserProgress') || '{}');
    delete allProgress[userId];
    localStorage.setItem('allUserProgress', JSON.stringify(allProgress));

    loadUsers();
    toast({
      title: "User deleted",
      description: "The user has been removed successfully",
    });
  };

  const handleEditUser = (userToEdit: User) => {
    setEditingUser(userToEdit);
    setEditUsername(userToEdit.username);
  };

  const handleSaveEdit = () => {
    if (!editingUser) return;

    const storedUsers = JSON.parse(localStorage.getItem('quizUsers') || '[]');
    const updatedUsers = storedUsers.map((u: any) => 
      u.id === editingUser.id ? { ...u, username: editUsername } : u
    );
    localStorage.setItem('quizUsers', JSON.stringify(updatedUsers));

    setEditingUser(null);
    loadUsers();
    toast({
      title: "User updated",
      description: "Username has been changed successfully",
    });
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPoints = users.reduce((acc, u) => acc + (u.progress?.totalPoints || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-gaming text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage users and monitor activity</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/20">
            <Shield className="h-5 w-5 text-secondary" />
            <span className="font-medium text-secondary">Admin</span>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="gaming-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-gaming text-2xl font-bold">{users.length}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </div>
          <div className="gaming-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="font-gaming text-2xl font-bold">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">Total Points Earned</div>
              </div>
            </div>
          </div>
          <div className="gaming-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="font-gaming text-2xl font-bold">
                  {users.filter(u => u.isAdmin).length}
                </div>
                <div className="text-sm text-muted-foreground">Admins</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="gaming-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-gaming text-xl font-bold">User Management</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-input"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium">{u.username}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.isAdmin ? 'bg-secondary/20 text-secondary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {u.isAdmin ? 'Admin' : 'User'}
                      </span>
                    </TableCell>
                    <TableCell>{u.progress?.totalPoints || 0}</TableCell>
                    <TableCell>
                      <span className="font-gaming text-primary">{u.progress?.rank || 'Beginner'}</span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditUser(u)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="gaming-card">
                            <DialogHeader>
                              <DialogTitle className="font-gaming">Edit User</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div>
                                <label className="text-sm text-muted-foreground">Username</label>
                                <Input
                                  value={editUsername}
                                  onChange={(e) => setEditUsername(e.target.value)}
                                  className="bg-input mt-1"
                                />
                              </div>
                              <Button onClick={handleSaveEdit} className="w-full btn-gaming">
                                Save Changes
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={u.id === user?.id}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching your search.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
