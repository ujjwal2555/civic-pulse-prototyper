import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Building2 } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role') as 'citizen' | 'admin' | null;
  const [role, setRole] = useState<'citizen' | 'admin'>(roleParam || 'citizen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }

    login(role, name);
    toast.success(`Welcome, ${name}!`);
    
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to CivicConnect</CardTitle>
          <CardDescription>
            {role === 'admin' ? 'Admin Portal Access' : 'Citizen Portal Access'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 p-1 bg-muted rounded-lg mb-6">
              <button
                type="button"
                className={`flex-1 py-2 rounded-md transition-colors ${
                  role === 'citizen'
                    ? 'bg-background shadow-sm font-medium'
                    : 'hover:bg-background/50'
                }`}
                onClick={() => setRole('citizen')}
              >
                Citizen
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-md transition-colors ${
                  role === 'admin'
                    ? 'bg-background shadow-sm font-medium'
                    : 'hover:bg-background/50'
                }`}
                onClick={() => setRole('admin')}
              >
                Admin
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              {role === 'admin' ? 'Access Admin Portal' : 'Access Citizen Portal'}
            </Button>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Demo mode: Any name and email will work
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
