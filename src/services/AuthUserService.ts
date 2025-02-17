import PrismaClient from "../prisma"
import jwt from 'fastify-jwt';
import bcrypt from 'bcrypt'

import { app } from '../server'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
class AuthUserService {
  async login(username: string, password: string): Promise<string> {
    const user = await PrismaClient.user.findFirst({
      where: { username },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await PrismaClient.user.findFirst({
        where: { password },
      });;

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gera um token JWT
    const token = app.jwt.sign({ id: user.id, username: user.username }, { expiresIn: '1h'});

    return token;
  }
}

export { AuthUserService }