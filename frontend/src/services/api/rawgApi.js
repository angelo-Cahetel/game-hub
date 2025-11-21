import { API_CONFIG } from "../../config/api.config";

export const rawgApi = {
  async searchGames(searchTerm, pageSize = 10) {
    const response = await fetch(
      `${API_CONFIG.RAWG_API_URL}${API_CONFIG.ENDPOINTS.GAMES}?key=${API_CONFIG.RAWG_API_KEY}&search=${searchTerm}&page_size=${pageSize}`
    );
    return response.json();
  },

  async getGameDetails(gameId) {
    const response = await fetch(
      `${API_CONFIG.RAWG_API_URL}${API_CONFIG.ENDPOINTS.GAME_DETAILS(
        gameId
      )}?key=${API_CONFIG.RAWG_API_KEY}`
    );
    return response.json();
  },

  async getGameScreenshots(gameId) {
    const response = await fetch(
      `${API_CONFIG.RAWG_API_URL}${API_CONFIG.ENDPOINTS.SCREENSHOTS(
        gameId
      )}?key=${API_CONFIG.RAWG_API_KEY}`
    );
    return response.json();
  },

  async getGameAchievements(gameId) {
    const response = await fetch(
      `${API_CONFIG.RAWG_API_URL}${API_CONFIG.ENDPOINTS.ACHIVEMENTS(
        gameId
      )}?key=${API_CONFIG.RAWG_API_KEY}`
    );
    return response.json();
  },
};
