import { httpClient } from "./httpClient";

export const gamesApi = {
  async getUserGames(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/games?${queryParams}` : "/games";
    const data = await httpClient.get(endpoint);
    return data.games;
  },

  async addGames(gameData) {
    const data = await httpClient.post("games", {
      gameId: gameData.id,
      gameName: gameData.name,
      gameImage: gameData.image,
      plataforms: gameData.plataforms,
    });
    return data.game;
  },

  async updateGame(gameId, updates) {
    const data = await httpClient.patch(`/games/${gameId}`, updates);
    return data.game;
  },

  async deleteGame(gameId) {
    await httpClient.delete(`/games/${gameId}`);
  },

  async gameStats() {
    const data = await httpClient.get("/games/stats");
    return data.stats;
  },
};
