
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background w-full">
      <Navbar />
      {user ? (
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 p-6">
              {children || <Outlet />}
            </main>
          </div>
        </SidebarProvider>
      ) : (
        <main className="p-6">
          {children || <Outlet />}
        </main>
      )}
    </div>
  );
};

export default AppLayout;
