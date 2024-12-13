import PrismaClient from "../prisma"
import jwt from 'fastify-jwt';
import bcrypt from 'bcrypt'

import { app } from '../server'

class AuthUserService {
  async login(email: string, password: string): Promise<string> {
    const user = await PrismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gera um token JWT
    const token = app.jwt.sign({ id: user.id, email: user.email },{
      expiresIn: '1h',
    });

    return token;
  }
}

export { AuthUserService }