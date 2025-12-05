import bcrypt from "bcrypt";
import prisma from "../config/database.js";
import { generateToken } from "../utils/jwt.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validação
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // verifica se usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });

    // has da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria usuário
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        provider: "local",
      },
      select: {
        id: true,
        email: true,
        name: true,
        createAt: true,
      },
    });

    // gera generateToken
    const token = generateToken(user.id);

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

// registra usuário com o Google
// API DO GOOGLE AINDA NÃO ESTÁ IMPLEMENTADA, MAS JÁ DEIXEI A LÓGICA AQUI
export const googleAuth = async (req, res, next) => {
  try {
    const { email, name, avatar, googleId } = req.body;

    // Busca ou cria usuário
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          avatar,
          provider: "google",
          providerId: googleId,
        },
      });
    }

    // Gera token
    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
