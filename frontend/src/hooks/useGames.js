import { useState, useEffect } from "react";
import { gamesApi } from "../services/api/gamesApi.js";

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGames();
    loadStats();
  }, []);

  const loadGames = async (filters) => {
    try {
      setLoading(true);
      const data = await gamesApi.getUserGames(filters);
      setGames(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const data = await gamesApi.gameStats();
      setStats(data);
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
    }
  };

  const addGame = async (gameData) => {
    try {
      const newGame = await gamesApi.addGames(gameData);
      setGames([...games, newGame]);
      await loadStats();
      return newGame;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateGame = async (gameId, updates) => {
    try {
      const updatedGame = await updateGame.updatedGame(gameId, updates);
      setGames(games.map((g) => (g.id === gameId ? updatedGame : g)));
      await loadStats();
      return updatedGame;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteGame = async (gameId) => {
    try {
      await gamesApi.deleteGame(gameId);
      setGames(games.filter((g) => g.id !== gameId));
      await loadStats();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    games,
    stats,
    loading,
    error,
    loadGames,
    addGame,
    updateGame,
    deleteGame,
  };
};
