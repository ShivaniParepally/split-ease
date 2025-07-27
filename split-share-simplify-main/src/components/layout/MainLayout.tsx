
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Layers, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useAuth } from '@/context/AuthContext';

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Friends', path: '/friends', icon: Users },
  { name: 'Groups', path: '/groups', icon: Layers },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-splitease-soft-purple">
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 hidden w-64 bg-white shadow-lg lg:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center p-6">
            <Logo />
          </div>
          
          {/* User info */}
          {user && (
            <div className="mx-4 mb-6 rounded-md bg-splitease-soft-purple p-4">
              <div className="text-sm font-medium text-splitease-primary">
                Welcome
              </div>
              <div className="font-semibold">
                {user.name || user.email}
              </div>
            </div>
          )}
          
          <nav className="mt-2 flex-1 space-y-1 px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'flex items-center rounded-md px-4 py-3 text-sm font-medium transition-all',
                    isActive
                      ? 'bg-splitease-primary text-white'
                      : 'text-gray-600 hover:bg-splitease-soft-purple hover:text-splitease-primary'
                  )}
                >
                  <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-white' : 'text-gray-400')} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4">
            <Button variant="outline" className="w-full justify-start text-gray-600" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-10 flex h-16 items-center bg-white shadow-sm lg:hidden">
        <div className="flex w-full items-center justify-between px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <div className="ml-2">
              <Logo small />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        navItems={navItems} 
        onClose={() => setMobileMenuOpen(false)} 
        onLogout={logout}
        userName={user?.name || user?.email || ''}
      />

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="min-h-screen px-4 py-6 pt-20 lg:px-8 lg:py-8 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
