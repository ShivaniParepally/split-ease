
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  small?: boolean;
}

const Logo: React.FC<LogoProps> = ({ small = false }) => {
  return (
    <div className="flex items-center">
      <div className={cn(
        "rounded-md bg-gradient-to-r from-splitease-primary to-splitease-secondary flex items-center justify-center",
        small ? "h-8 w-8" : "h-10 w-10"
      )}>
        <span className={cn(
          "font-bold text-white",
          small ? "text-lg" : "text-xl"
        )}>
          S
        </span>
      </div>
      <div className={cn(
        "font-bold ml-2",
        small ? "text-lg" : "text-xl"
      )}>
        <span className="text-splitease-primary">Split</span>
        <span className="text-splitease-secondary">Ease</span>
      </div>
    </div>
  );
};

export default Logo;
