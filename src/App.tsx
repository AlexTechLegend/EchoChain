import React, { useState } from 'react';
import PersonaToggle from './components/PersonaToggle';
import DepthSelector from './components/DepthSelector';
import Recorder from './components/Recorder';

export default function App() {
  const [persona, setPersona] = useState<'genz' | 'millennial' | 'boomer'>('genz');
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-md rounded p-4 w-full max-w-md space-y-4">
        <PersonaToggle persona={persona} onChange={setPersona} />
        <p className="text-center">Someone just said...</p>
        {/* TODO: Autoplay previous clip */}
        <DepthSelector />
        <Recorder persona={persona} />
      </div>
    </div>
  );
}
