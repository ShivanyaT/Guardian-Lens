
import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="flex h-16 items-center px-4 md:px-6">
        <SidebarTrigger />
        <div className="ml-4 flex items-center">
          <Link to="/" className="flex items-center">
            <div className="rounded-full bg-blue-600 p-1.5 mr-2">
              <div className="rounded-full bg-white p-1">
                <div className="rounded-full bg-blue-600 w-4 h-4"></div>
              </div>
            </div>
            <span className="text-xl font-bold text-primary">Guardian Lens</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="font-medium">
                {user?.email}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
