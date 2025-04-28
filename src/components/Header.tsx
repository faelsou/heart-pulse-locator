
import React from 'react';
import { Heart, LogIn } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title = "Doação de Sangue", showBack = false }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm z-20 border-b border-gray-100 py-4 px-4">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {showBack ? (
          <button 
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center text-gray-700"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div className="w-8" />
        )}
        
        <div className="flex items-center">
          <Heart className="w-5 h-5 text-bloodred-500 mr-2" fill="#FFD1D1" strokeWidth={2.5} />
          <h1 className="text-lg font-medium text-gray-900">{title}</h1>
        </div>
        
        <Link to="/login" className="w-8 h-8 flex items-center justify-center text-gray-700">
          <LogIn className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
