import React from 'react';

interface Props {
  persona: 'genz' | 'millennial' | 'boomer';
}

const submitLabels = {
  genz: 'Yeet it 🚀',
  millennial: 'Ship it!',
  boomer: "Send 'er off",
};

export default function Recorder({ persona }: Props) {
  return (
    <div className="text-center space-y-2">
      {/* TODO: implement audio recording */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        {submitLabels[persona]}
      </button>
      <button className="underline text-sm block mx-auto">Skip</button>
    </div>
  );
}
