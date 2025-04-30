
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin, Navigation } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number }>({ lat: -23.5505, lng: -46.6333 }); // São Paulo default
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  
  // Filter centers based on props
  const filteredCenters = donationCentersData.filter(center => {
    const matchesType = filteredTypes.length === 0 || 
      center.bloodTypes.some(type => filteredTypes.includes(type));
    const matchesUrgent = !showUrgentOnly || center.urgentNeed;
    return matchesType && matchesUrgent;
  });

  // Get user location
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
  }, []);

  // Check for saved token in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox-token');
    if (savedToken) {
      setMapboxToken(savedToken);
    } else {
      setShowTokenInput(true);
    }
  }, []);

  // Initialize map when token is available and container is ready
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [currentLocation.lng, currentLocation.lat],
        zoom: 13,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      // Add markers when map loads
      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Add user location marker
        new mapboxgl.Marker({
          color: '#3D7DFF',
          scale: 1,
        })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .addTo(map.current!);

        // Add donation centers markers
        filteredCenters.forEach(center => {
          const markerEl = document.createElement('div');
          markerEl.className = 'custom-marker';
          markerEl.innerHTML = `<div class="marker ${center.urgentNeed ? 'urgent' : ''}"></div>`;
          markerEl.style.cursor = 'pointer';
          
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([center.position.lng, center.position.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${center.name}</h3>
                      <p>Tipos sanguíneos: ${center.bloodTypes.join(', ')}</p>
                      ${center.urgentNeed ? '<p class="urgent-text">Necessidade urgente!</p>' : ''}`)
            )
            .addTo(map.current!);
          
          markerEl.addEventListener('click', () => {
            onSelectCenter(center);
          });
        });
      });

      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error("Error initializing map:", error);
      setShowTokenInput(true);
    }
  }, [mapboxToken, currentLocation, filteredCenters, onSelectCenter]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mapbox-token', mapboxToken);
    setShowTokenInput(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg bg-graybg-100">
      {showTokenInput ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
          <h3 className="font-medium text-lg mb-4">Mapbox API Token Necessário</h3>
          <p className="text-sm text-gray-600 mb-4">
            Para utilizar o mapa, insira seu token público do Mapbox. 
            <br />Você pode obter um em <a href="https://mapbox.com/account/access-tokens" target="_blank" rel="noreferrer" className="text-bloodred-500 underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-sm">
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="Insira seu token público do Mapbox"
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-bloodred-500 text-white py-2 px-4 rounded hover:bg-bloodred-600"
            >
              Salvar Token
            </button>
          </form>
        </div>
      ) : !mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="w-full h-full" />
          <button
            className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md z-10"
            onClick={() => {
              map.current?.flyTo({
                center: [currentLocation.lng, currentLocation.lat],
                zoom: 14,
                speed: 1.2
              });
            }}
            aria-label="Ir para minha localização"
          >
            <Navigation className="w-5 h-5 text-bluedark-500" />
          </button>
        </>
      )}

      <style>{`
        .mapboxgl-popup-content {
          padding: 15px;
          border-radius: 8px;
        }
        .mapboxgl-popup-content h3 {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .urgent-text {
          color: #e11d48;
          font-weight: 600;
        }
        .custom-marker {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .marker {
          width: 24px;
          height: 24px;
          background-color: white;
          border: 2px solid #e11d48;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s;
        }
        .marker.urgent {
          background-color: #fee2e2;
        }
        .marker:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Map;
