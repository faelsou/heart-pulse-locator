
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, MapPin, Phone, Calendar, Info, Check, Heart } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";

// Sample donation center details (in a real app, this would come from an API)
const donationCenters = [
  { 
    id: 1, 
    name: "Hospital São Paulo", 
    address: "Rua Napoleão de Barros, 715 - Vila Clementino, São Paulo - SP",
    phone: "(11) 5576-4848",
    hours: "Segunda a Sábado: 7h às 18h\nDomingo: 8h às 12h",
    distance: 1.2,
    bloodTypes: ["A+", "A-", "O+", "AB+"],
    urgentNeed: true,
    requirements: [
      "Documento com foto",
      "Idade entre 16 e 69 anos",
      "Estar descansado e alimentado",
      "Pesar mais de 50kg",
      "Não ter ingerido álcool nas últimas 12h"
    ],
    bloodStock: [
      { type: "A+", level: "medium" },
      { type: "A-", level: "low" },
      { type: "B+", level: "high" },
      { type: "B-", level: "medium" },
      { type: "AB+", level: "high" },
      { type: "AB-", level: "medium" },
      { type: "O+", level: "low" },
      { type: "O-", level: "critical" }
    ]
  },
  // You can add more centers here...
];

const CenterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [center, setCenter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const foundCenter = donationCenters.find(c => c.id === Number(id));
      setCenter(foundCenter);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleScheduleAppointment = () => {
    // In a real app, this would open a scheduling form or calendar
    alert("Em um aplicativo real, isso abriria um formulário de agendamento");
  };

  const handleGetDirections = () => {
    // In a real app, this would open the native maps app with directions
    alert("Em um aplicativo real, isso abriria a navegação para o centro");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-graybg-50 flex flex-col">
        <Header showBack title="Detalhes do Centro" />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-bloodred-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!center) {
    return (
      <div className="min-h-screen bg-graybg-50 flex flex-col">
        <Header showBack title="Detalhes do Centro" />
        <div className="flex-1 flex items-center justify-center p-4 text-center">
          <div>
            <Info className="w-16 h-16 mx-auto text-bluedark-500 mb-4 opacity-80" />
            <h2 className="text-xl font-medium mb-2">Centro não encontrado</h2>
            <p className="text-gray-500 mb-6">O centro de doação solicitado não existe ou foi removido.</p>
            <Button onClick={() => navigate('/')}>Voltar para o mapa</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-graybg-50 flex flex-col">
      <Header showBack title="Detalhes do Centro" />
      
      <main className="flex-1 max-w-md mx-auto w-full pb-20">
        {/* Basic info */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-5">
          <h1 className="text-xl font-semibold mb-1">{center.name}</h1>
          
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">{center.address}</p>
          </div>
          
          <div className="flex items-start gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600 whitespace-pre-line">{center.hours}</p>
          </div>
          
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">{center.phone}</p>
          </div>
        </div>
        
        {/* Blood stock */}
        <div className="bg-white mt-3 shadow-sm px-4 py-4">
          <h2 className="text-lg font-medium mb-3">Estoque de sangue</h2>
          
          <div className="grid grid-cols-4 gap-2">
            {center.bloodStock.map((stock: any) => (
              <div 
                key={stock.type} 
                className="flex flex-col items-center bg-graybg-50 rounded-lg p-2"
              >
                <span className={`text-lg font-bold ${
                  stock.level === 'critical' ? 'text-bloodred-600' :
                  stock.level === 'low' ? 'text-bloodred-500' :
                  stock.level === 'medium' ? 'text-gray-700' :
                  'text-gray-700'
                }`}>{stock.type}</span>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      stock.level === 'critical' ? 'bg-bloodred-600 w-[10%]' :
                      stock.level === 'low' ? 'bg-bloodred-500 w-[30%]' :
                      stock.level === 'medium' ? 'bg-bluedark-500 w-[60%]' :
                      'bg-green-500 w-[85%]'
                    }`}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-1 capitalize">{stock.level}</span>
              </div>
            ))}
          </div>
          
          {center.urgentNeed && (
            <div className="mt-4 bg-bloodred-50 border border-bloodred-100 rounded-lg p-3 flex items-center">
              <Heart className="w-5 h-5 text-bloodred-500 mr-2" fill="#FFD1D1" />
              <p className="text-sm text-bloodred-700">
                Este centro tem necessidade urgente de doadores.
              </p>
            </div>
          )}
        </div>
        
        {/* Requirements */}
        <div className="bg-white mt-3 shadow-sm px-4 py-4">
          <h2 className="text-lg font-medium mb-3">Requisitos para doação</h2>
          
          <ul className="space-y-2">
            {center.requirements.map((req: string, index: number) => (
              <li key={index} className="flex items-center">
                <Check className="w-4 h-4 text-bluedark-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      
      {/* Fixed action buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex gap-3 max-w-md mx-auto">
        <Button 
          variant="outline"
          className="flex-1 border-bluedark-500 text-bluedark-500 hover:bg-bluedark-500 hover:text-white"
          onClick={handleGetDirections}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Ver no mapa
        </Button>
        
        <Button 
          className="flex-1 bg-bloodred-500 hover:bg-bloodred-600 text-white"
          onClick={handleScheduleAppointment}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Agendar
        </Button>
      </div>
    </div>
  );
};

export default CenterDetails;
