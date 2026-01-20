import prisma from "../config/database.js";

export const getUserGames = async (req, res, next) => {
  try {
    const { status, sortBy = "addedAt", order = "desc" } = req.query;

    const where = { userId: req.user.id };
    if (status) {
      where.status = status;
    }

    const games = await prisma.userGame.findMany({
      where,
      orderBy: { [sortBy]: order },
    });

    res.json({ games });
  } catch (error) {
    next(error);
  }
};

export const addGame = async (req, res, next) => {
  try {
    const { gameId, gameName, gameImage, plataforms } = req.body;

    // validação
    if (!gameId || !gameName) {
      return res
        .status(400)
        .json({ error: "gameId e gameName são obrigatórios" });
    }

    // verifica se jogo já existe na biblioteca do usuário
    const existingGame = await prisma.userGame.findUnique({
      where: {
        userId_gameId: {
          userId: req.user.id,
          gameId,
        },
      },
    });

    if (existingGame) {
      return res.status(400).json({ error: "Jogo já está na sua biblioteca" });
    }

    // adiciona jogo
    const game = await prisma.userGame.create({
      data: {
        userId: req.user.id,
        gameId,
        gameName,
        gameImage,
        plataforms,
        status: "Não Incluido",
      },
    });

    res.status(201).json({ game });
  } catch (error) {
    next(error);
  }
};

export const updateGame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, myRating, playTime, notes } = req.body;

    // verifica se o jogo pertence ao usuário
    const game = await prisma.userGame.findUnique({
      where: { id },
    });

    if (!game) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }
    if (game.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Sem permissão para atualizar este jogo" });
    }

    // atualiza jogo
    const updateGame = await prisma.userGame.update({
      where: { id },
      data: {
        status,
        myRating,
        playTime,
        notes,
      },
    });

    res.json({ game: updateGame });
  } catch (error) {
    next(error);
  }
};

export const deleteGame = async (req, res, next) => {
  try {
    const { id } = req.params;

    //verifica se o jogo pertence ao usuário
    const game = await prisma.userGame.findUnique({
      where: { id },
    });

    if (!game) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }

    if (game.userId !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Sem permissão para deletar este jogo" });
    }

    // Deleta jogo
    await prisma.userGame.delete({
      where: { id },
    });

    res.json({ message: "Jogo removido com sucesso" });
  } catch {
    next(error);
  }
};

export const getGameStats = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [total, playing, completed, notStarted, totalHours] =
      await Promise.all([
        prisma.userGame.count({ where: { userId } }),
        prisma.userGame.count({ where: { userId, status: "Jogando" } }),
        prisma.userGame.count({ where: { userId, status: "Finalizado" } }),
        prisma.userGame.count({ where: { userId, status: "Não Iniciado" } }),
        prisma.userGame.aggregate({
          where: { userId },
          _sum: { playTime: true },
        }),
      ]);
    res.json({
      stats: {
        total,
        playing,
        completed,
        notStarted,
        totalHours: totalHours._sum.playTime || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};
