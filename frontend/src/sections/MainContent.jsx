import React from 'react';
import GameCard from '../components/GameCard';

const mockGames = [
  {
    name: 'The Witcher 3: Wild Hunt',
    background_image: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg?t=1603921239',
  },
  {
    name: 'Red Dead Redemption 2',
    background_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg?t=1618851902',
  },
  {
    name: 'Cyberpunk 2077',
    background_image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg?t=1618851902',
  },
  {
    name: 'Grand Theft Auto V',
    background_image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg?t=1618851902',
  },
];

const MainContent = () => {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-8">New and trending</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockGames.map(game => (
          <GameCard key={game.name} game={game} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;

