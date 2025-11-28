import { verifyToken } from "../utils/jwt.js";
import prisma from "../config/database.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header.authorization?.split("")[1];

    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    const decoded = verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded.user },
      select: { id: true, email: true, name: true, avatar: true },
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
