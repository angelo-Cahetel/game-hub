import bcrypt from "../utils/bcrypt.js";
import prisma from "../config/database.js";
import { generateToken } from "../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";
import { z } from "zod";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Schemas de validação
const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

// Cria novo usuário
export const register = async (req, res, next) => {
  try {
    // Validação
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message });
    }

    const { email, password, name } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // cria usuário
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
        createdAt: true,
      },
    });
    // gera token
    const token = generateToken(user.id);
    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
};

// autenticar usuário
export const login = async (req, res, next) => {
  try {
    // Validação
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors[0].message });
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

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

// implementar login com Google de forma segura
export const googleAuth = async (req, res, next) => {
  try {
    // O frontend deve enviar o 'credential' (ID Token)
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Token do Google não fornecido" });
    }

    // Verificar o token com o Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          avatar: picture,
          provider: "google",
          providerId: googleId,
        },
      });
    } else if (user.provider !== 'google') {
       // Opcional: Permitir vincular contas ou bloquear
       // Por enquanto, atualizamos o avatar se não tiver e logamos
       if (!user.avatar) {
           await prisma.user.update({
               where: { id: user.id },
               data: { avatar: picture, provider: "google", providerId: googleId } // Vincula conta implicitamente
           });
       }
    }

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
    console.error("Google Auth Error:", error);
    res.status(401).json({ error: "Falha na autenticação com Google" });
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};