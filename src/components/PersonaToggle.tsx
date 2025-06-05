import React from 'react';

interface Props {
  persona: 'genz' | 'millennial' | 'boomer';
  onChange: (p: 'genz' | 'millennial' | 'boomer') => void;
}

const labels = {
  genz: 'Gen Z',
  millennial: 'Millennial',
  boomer: 'Boomer',
};

export default function PersonaToggle({ persona, onChange }: Props) {
  return (
    <div className="flex justify-end">
      <select
        className="border p-1 rounded"
        value={persona}
        onChange={(e) => onChange(e.target.value as any)}
      >
        {Object.entries(labels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
