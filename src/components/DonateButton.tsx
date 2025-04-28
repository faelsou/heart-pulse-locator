
import React from 'react';
import { Heart } from 'lucide-react';

interface DonateButtonProps {
  onClick: () => void;
}

const DonateButton: React.FC<DonateButtonProps> = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 bg-bloodred-500 hover:bg-bloodred-600 text-white rounded-full h-14 w-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 group"
    >
      <div className="absolute inset-0 bg-bloodred-500 rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>
      <Heart className="w-6 h-6" fill="white" />
      <span className="sr-only">Doar agora</span>
    </button>
  );
};

export default DonateButton;
