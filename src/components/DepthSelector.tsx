import React from 'react';

const levels = ['Surface', 'Casual', 'Thoughtful', 'Deep', 'Soul-level'];

export default function DepthSelector() {
  return (
    <div>
      <p className="mb-2">How raw you wanna get?</p>
      <div className="flex space-x-2">
        {levels.map((label, i) => (
          <label key={i} className="flex items-center space-x-1">
            <input name="depth" type="radio" value={i + 1} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
