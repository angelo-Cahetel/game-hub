import React from 'react';

const GameCard = ({ game }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{game.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            {/* Placeholder for icons */}
          </div>
          <div className="text-sm font-bold">
            {/* Placeholder for rating */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
