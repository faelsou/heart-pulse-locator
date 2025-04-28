
import React from 'react';
import { Clock, MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DonationCenterProps {
  id: number;
  name: string;
  address?: string;
  distance?: number;
  bloodTypes: string[];
  urgentNeed: boolean;
  openNow?: boolean;
}

const DonationCenter: React.FC<DonationCenterProps> = ({
  id,
  name,
  address = "Av. Paulista, 100 - São Paulo",
  distance = 1.2,
  bloodTypes,
  urgentNeed,
  openNow = true,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/center/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden animate-slide-up"
      onClick={handleViewDetails}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg text-gray-900">{name}</h3>
          {urgentNeed && (
            <span className="bg-bloodred-50 text-bloodred-600 text-xs font-medium py-1 px-2 rounded-full flex items-center gap-1">
              <Heart className="w-3 h-3" fill="currentColor" /> Urgente
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{address}</span>
          <span className="ml-auto text-xs text-muted-foreground">{distance} km</span>
        </div>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <Clock className="w-3 h-3" />
          <span>{openNow ? 'Aberto agora' : 'Fechado'}</span>
        </div>
        
        <div className="flex flex-wrap gap-1.5">
          {bloodTypes.map((type) => (
            <span
              key={type}
              className={`py-0.5 px-2 text-xs font-medium rounded-full ${
                urgentNeed && (type === "O-" || type === "O+")
                  ? "bg-bloodred-100 text-bloodred-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <div 
        className={`w-full h-1 ${
          urgentNeed ? "bg-bloodred-500" : "bg-bluedark-500"
        }`}
      />
    </div>
  );
};

export default DonationCenter;
