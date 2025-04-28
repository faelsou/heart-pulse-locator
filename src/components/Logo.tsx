
import React from 'react';
import { Heart } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${showText ? '' : 'mx-auto'}`}>
        <Heart 
          className={`${sizeClasses[size]} text-bloodred-500`} 
          fill="#FFD1D1" 
          strokeWidth={2.5} 
        />
        <div className="absolute inset-0 animate-pulse-soft">
          <Heart 
            className={`${sizeClasses[size]} text-bloodred-500`} 
            fill="transparent" 
            strokeWidth={2.5} 
          />
        </div>
      </div>
      
      {showText && (
        <h1 className={`font-medium ${size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'}`}>
          Pulse<span className="text-bloodred-500">Finder</span>
        </h1>
      )}
    </div>
  );
};

export default Logo;
