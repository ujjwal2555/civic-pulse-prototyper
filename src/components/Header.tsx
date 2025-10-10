import { Building2, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout, userName, role } = useAuth();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CivicConnect</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate(role === 'admin' ? '/admin' : '/dashboard')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname.includes(role === 'admin' ? 'admin' : 'dashboard')
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                Dashboard
              </button>
              {role === 'citizen' && (
                <button
                  onClick={() => navigate('/report')}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === '/report'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  Report Issue
                </button>
              )}
              <button
                onClick={() => navigate('/analytics')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/analytics'
                    ? 'text-primary'
                    : 'text-muted-foreground'
                }`}
              >
                Analytics
              </button>
            </>
          )}
          <button
            onClick={() => navigate('/about')}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              location.pathname === '/about'
                ? 'text-primary'
                : 'text-muted-foreground'
            }`}
          >
            About
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {userName}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
