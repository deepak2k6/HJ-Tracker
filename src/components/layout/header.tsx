import { Link, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Activity className="h-6 w-6" />
          <span className="font-bold">Health Journal</span>
        </Link>
        <nav className="flex flex-1 items-center justify-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/symptoms" className="text-sm font-medium">
                Symptoms
              </Link>
              <Link to="/records" className="text-sm font-medium">
                Records
              </Link>
            </>
          ) : (
            <>
              <Link to="/about" className="text-sm font-medium">
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium">
                Contact
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <Button variant="outline" onClick={handleLogout}>
              Sign Out
            </Button>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}