import React from 'react';

const CardTerminal: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg w-full max-w-lg font-mono">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 text-red-500">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <p className="text-sm">bash</p>
      </div>
      <div className="mt-4">
        <p className="text-green-400">$ npm install next</p>
        <p className="text-white">+ next@10.2.3</p>
        <p className="text-white">added 1 package, and audited 2 packages in 3s</p>
        <p className="text-green-400">$</p>
      </div>
    </div>
  );
};

export default CardTerminal;
