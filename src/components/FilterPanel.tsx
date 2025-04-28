
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

interface FilterPanelProps {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  showUrgentOnly: boolean;
  setShowUrgentOnly: (show: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedTypes,
  setSelectedTypes,
  showUrgentOnly,
  setShowUrgentOnly,
}) => {
  const handleTypeClick = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 animate-fade-in">
      <div className="flex items-center mb-4">
        <Filter className="w-4 h-4 mr-2 text-bloodred-500" />
        <h2 className="font-medium">Filtrar centros de doação</h2>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">Tipo sanguíneo</p>
        <div className="flex flex-wrap gap-2">
          {bloodTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`py-1 px-3 text-sm font-medium rounded-full transition-colors ${
                selectedTypes.includes(type)
                  ? "bg-bloodred-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <input
            id="urgent-only"
            type="checkbox"
            checked={showUrgentOnly}
            onChange={() => setShowUrgentOnly(!showUrgentOnly)}
            className="w-4 h-4 accent-bloodred-500"
          />
          <label htmlFor="urgent-only" className="ml-2 text-sm text-gray-600">
            Mostrar apenas centros com necessidade urgente
          </label>
        </div>
      </div>

      {(selectedTypes.length > 0 || showUrgentOnly) && (
        <Button
          variant="ghost"
          size="sm"
          className="text-bluedark-500 hover:text-bluedark-600 p-0 h-auto text-sm"
          onClick={() => {
            setSelectedTypes([]);
            setShowUrgentOnly(false);
          }}
        >
          Limpar filtros
        </Button>
      )}
    </div>
  );
};

export default FilterPanel;
