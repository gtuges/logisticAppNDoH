import React, { memo } from 'react';
import { Truck, Ship, Plane } from 'lucide-react';
import FormField from '../../common/FormField';
import { TRANSPORT_MODES } from './constants';

interface TransportModeSelectorProps {
  selectedModes: number[];
  onChange: (modes: number[]) => void;
}

const ICONS = {
  Road: Truck,
  Sea: Ship,
  Air: Plane
};

const TransportModeSelector: React.FC<TransportModeSelectorProps> = ({
  selectedModes,
  onChange
}) => {
  const handleModeToggle = (modeId: number) => {
    const newModes = selectedModes.includes(modeId)
      ? selectedModes.filter(id => id !== modeId)
      : [...selectedModes, modeId];
    onChange(newModes);
  };

  return (
    <FormField label="Transport Mode" required>
      <div className="mt-2 grid grid-cols-3 gap-4">
        {TRANSPORT_MODES.map(mode => {
          const Icon = ICONS[mode.name as keyof typeof ICONS];
          return (
            <label
              key={mode.id}
              className={`
                flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer
                transition-colors
                ${selectedModes.includes(mode.id)
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-blue-200'
                }
              `}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedModes.includes(mode.id)}
                onChange={() => handleModeToggle(mode.id)}
              />
              <div className="flex flex-col items-center space-y-1">
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{mode.name}</span>
              </div>
            </label>
          );
        })}
      </div>
      <p className="mt-2 text-sm text-gray-500">
        Select all applicable transport modes used for this delivery
      </p>
    </FormField>
  );
};

export default memo(TransportModeSelector);