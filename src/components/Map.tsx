
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

// Simulated donation centers data
const donationCentersData = [
  { 
    id: 1, 
    name: "Hospital São Paulo", 
    position: { lat: -23.5974, lng: -46.6501 },
    bloodTypes: ["A+", "A-", "O+", "AB+"],
    urgentNeed: true
  },
  { 
    id: 2, 
    name: "Centro de Hemoterapia", 
    position: { lat: -23.5878, lng: -46.6700 },
    bloodTypes: ["O+", "O-", "B+", "B-"],
    urgentNeed: false
  },
  { 
    id: 3, 
    name: "Hospital Sírio-Libanês", 
    position: { lat: -23.5570, lng: -46.6693 },
    bloodTypes: ["A+", "B+", "AB+", "O-"],
    urgentNeed: true
  },
  { 
    id: 4, 
    name: "Hospital Albert Einstein", 
    position: { lat: -23.6000, lng: -46.7178 },
    bloodTypes: ["A-", "AB-", "O+", "B+"],
    urgentNeed: false
  },
  { 
    id: 5, 
    name: "Fundação Pró-Sangue", 
    position: { lat: -23.5576, lng: -46.6690 },
    bloodTypes: ["O+", "O-", "AB+", "AB-"],
    urgentNeed: true
  }
];

type DonationCenter = typeof donationCentersData[0];

interface MapProps {
  onSelectCenter: (center: DonationCenter) => void;
  filteredTypes?: string[];
  showUrgentOnly?: boolean;
}

const Map: React.FC<MapProps> = ({ onSelectCenter, filteredTypes = [], showUrgentOnly = false }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: -23.5505, lng: -46.6333 }); // São Paulo default
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Filter centers based on props
  const filteredCenters = donationCentersData.filter(center => {
    const matchesType = filteredTypes.length === 0 || 
      center.bloodTypes.some(type => filteredTypes.includes(type));
    const matchesUrgent = !showUrgentOnly || center.urgentNeed;
    return matchesType && matchesUrgent;
  });

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("Unable to retrieve your location");
        }
      );
    }

    // Simulate map loading
    setTimeout(() => setMapLoaded(true), 1000);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-graybg-100">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className={`map-container ${mapLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* In a real app, this would be a MapboxGL or Google Maps component */}
        <div className="relative w-full h-full bg-graybg-100">
          {/* Simulated map UI */}
          <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-46.65,-23.55,11,0/1200x800?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V5cHVyeXoweHJzMnJteGl5ZXIzZ3dhIn0._yp2P71QnYhxjbmrQpGLdg')] bg-cover bg-center" />
          
          {/* User location */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-4 h-4 bg-bluedark-500 rounded-full animate-pulse-soft">
              <div className="w-4 h-4 bg-bluedark-500 opacity-25 rounded-full animate-ping absolute"></div>
            </div>
          </div>
          
          {/* Donation centers pins */}
          {filteredCenters.map((center) => (
            <button
              key={center.id}
              onClick={() => onSelectCenter(center)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 group"
              style={{
                left: `${Math.random() * 70 + 15}%`,
                top: `${Math.random() * 70 + 15}%`,
              }}
            >
              <div className="flex flex-col items-center">
                <MapPin 
                  className={`w-8 h-8 drop-shadow-md transition-transform group-hover:scale-110 ${
                    center.urgentNeed ? 'text-bloodred-500' : 'text-bloodred-300'
                  }`} 
                  fill={center.urgentNeed ? "#FFD1D1" : "transparent"} 
                  strokeWidth={2.5} 
                />
                <div className="opacity-0 group-hover:opacity-100 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium text-foreground transition-all duration-200 whitespace-nowrap mt-1">
                  {center.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
