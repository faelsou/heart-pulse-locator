
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Map from '@/components/Map';
import DonateButton from '@/components/DonateButton';
import FilterPanel from '@/components/FilterPanel';
import DonationCenter from '@/components/DonationCenter';
import { Info } from 'lucide-react';

// Sample donation centers (in a real app, this would come from an API)
const donationCentersData = [
  { 
    id: 1, 
    name: "Hospital São Paulo", 
    address: "Rua Napoleão de Barros, 715",
    distance: 1.2,
    bloodTypes: ["A+", "A-", "O+", "AB+"],
    urgentNeed: true,
    openNow: true
  },
  { 
    id: 2, 
    name: "Centro de Hemoterapia", 
    address: "Av. Dr. Enéas Carvalho de Aguiar, 155",
    distance: 2.5,
    bloodTypes: ["O+", "O-", "B+", "B-"],
    urgentNeed: false,
    openNow: true
  },
  { 
    id: 3, 
    name: "Hospital Sírio-Libanês", 
    address: "Rua Dona Adma Jafet, 91",
    distance: 3.0,
    bloodTypes: ["A+", "B+", "AB+", "O-"],
    urgentNeed: true,
    openNow: false
  },
  { 
    id: 4, 
    name: "Hospital Albert Einstein", 
    address: "Av. Albert Einstein, 627",
    distance: 4.8,
    bloodTypes: ["A-", "AB-", "O+", "B+"],
    urgentNeed: false,
    openNow: true
  },
  { 
    id: 5, 
    name: "Fundação Pró-Sangue", 
    address: "Av. Dr. Enéas Carvalho de Aguiar, 155",
    distance: 3.2,
    bloodTypes: ["O+", "O-", "AB+", "AB-"],
    urgentNeed: true,
    openNow: true
  }
];

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // Filter centers based on selected filters
  const filteredCenters = donationCentersData.filter(center => {
    const matchesType = selectedTypes.length === 0 || 
      center.bloodTypes.some(type => selectedTypes.includes(type));
    const matchesUrgent = !showUrgentOnly || center.urgentNeed;
    return matchesType && matchesUrgent;
  });

  const handleDonate = () => {
    navigate('/center/1'); // Navigate to the first center for demo
  };

  const handleCenterSelect = (center: any) => {
    navigate(`/center/${center.id}`);
  };

  return (
    <div className="min-h-screen bg-graybg-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Toggle and Filter bar */}
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center rounded-full bg-graybg-100 p-1">
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                viewMode === 'map'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600'
              }`}
              onClick={() => setViewMode('map')}
            >
              Mapa
            </button>
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600'
              }`}
              onClick={() => setViewMode('list')}
            >
              Lista
            </button>
          </div>
          
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              showFilters || selectedTypes.length > 0 || showUrgentOnly
                ? 'bg-bloodred-500 text-white'
                : 'bg-graybg-100 text-gray-700'
            }`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Filters panel */}
        {showFilters && (
          <div className="px-4 mb-3">
            <FilterPanel
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              showUrgentOnly={showUrgentOnly}
              setShowUrgentOnly={setShowUrgentOnly}
            />
          </div>
        )}
        
        {/* Map view */}
        {viewMode === 'map' && (
          <div className="flex-1 p-4">
            <div className="w-full h-full rounded-xl overflow-hidden shadow-sm">
              <Map 
                onSelectCenter={handleCenterSelect} 
                filteredTypes={selectedTypes}
                showUrgentOnly={showUrgentOnly}
              />
            </div>
          </div>
        )}
        
        {/* List view */}
        {viewMode === 'list' && (
          <div className="flex-1 px-4 py-2 space-y-3 mb-16">
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <DonationCenter key={center.id} {...center} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500">
                <Info className="w-12 h-12 text-bluedark-500 mb-2 opacity-80" />
                <h3 className="font-medium text-lg mb-1">Nenhum centro encontrado</h3>
                <p className="text-sm text-gray-400">
                  Tente ajustar seus filtros ou mudar sua localização
                </p>
              </div>
            )}
          </div>
        )}
      </main>
      
      <DonateButton onClick={handleDonate} />
    </div>
  );
};

export default Index;
