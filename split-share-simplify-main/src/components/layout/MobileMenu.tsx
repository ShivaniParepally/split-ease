
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type NavItem = {
  name: string;
  path: string;
  icon: React.ElementType;
};

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, onClose }) => {
  const location = useLocation();
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 lg:hidden" onClick={onClose}>
      <div 
        className="fixed inset-y-0 left-0 w-64 bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="mt-16 space-y-1">
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
                onClick={onClose}
              >
                <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-white' : 'text-gray-400')} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="outline" className="w-full justify-start text-gray-600">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
