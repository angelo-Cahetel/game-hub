import express from "express";
import {
  getUserGames,
  addGame,
  updateGame,
  deleteGame,
  getGameStats,
} from "../controller/gamesController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticate); // todas as rotas requerem autenticação

router.get("/", getUserGames);
router.post("/", addGame);
router.patch("/:id", updateGame);
router.delete("/:id", deleteGame);
router.get("/stats", getGameStats);

export default router;
