export const API_CONFIG = {
  RAWG_API_KEY: import.meta.env.VITE_API_KEY,
  RAWG_API_URL: import.meta.env.VITE_API_URL,
  ENDPOINTS: {
    GAMES: "/games",
    GAME_DETAILS: (id) => `/games/${id}`,
    SCREENSHOTS: (id) => `/games/${id}/screenshots`,
    ACHIVEMENTS: (id) => `/games/${id}/achievements`,
    PLATFORMS: "/platforms",
  },
};
