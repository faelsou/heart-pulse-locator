
import React from 'react';
import { MapPin, Filter, Calendar, Info } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OnboardingCarouselProps {
  onComplete: () => void;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({ onComplete }) => {
  const steps = [
    {
      title: "Encontre centros próximos",
      description: "Visualize no mapa os centros de doação de sangue mais próximos de você",
      icon: <MapPin className="w-12 h-12 text-bloodred-500" strokeWidth={1.5} />,
    },
    {
      title: "Filtre por tipo sanguíneo",
      description: "Use os filtros para encontrar centros que precisam do seu tipo de sangue",
      icon: <Filter className="w-12 h-12 text-bloodred-500" strokeWidth={1.5} />,
    },
    {
      title: "Agende sua doação",
      description: "Escolha um centro e agende sua doação com apenas alguns toques",
      icon: <Calendar className="w-12 h-12 text-bloodred-500" strokeWidth={1.5} />,
    },
    {
      title: "Informações detalhadas",
      description: "Veja requisitos, horários de funcionamento e estoque de sangue atualizado",
      icon: <Info className="w-12 h-12 text-bloodred-500" strokeWidth={1.5} />,
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <Carousel className="w-full">
        <CarouselContent>
          {steps.map((step, index) => (
            <CarouselItem key={index} className="pl-4">
              <div className="p-1">
                <Card className="border-none shadow-none">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="mb-6 p-4 bg-gray-50 rounded-full">
                      {step.icon}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-center">{step.title}</h2>
                    <p className="text-gray-600 text-center">{step.description}</p>
                    
                    {index === steps.length - 1 && (
                      <Button 
                        className="mt-8 w-full bg-bloodred-500 hover:bg-bloodred-600 text-white"
                        onClick={onComplete}
                      >
                        Começar a usar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 mt-4">
          <CarouselPrevious className="relative static left-0 translate-y-0 bg-white border-gray-200" />
          <CarouselNext className="relative static right-0 translate-y-0 bg-white border-gray-200" />
        </div>
      </Carousel>
    </div>
  );
};

export default OnboardingCarousel;
