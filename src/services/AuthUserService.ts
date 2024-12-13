import { FastifyRequest, FastifyReply } from "fastify";
import { DataUserProps } from "../controllers/AuthUserController";
import prisma from "../prisma";

class AuthUserService{
    async execute ({ token, email, password}: DataUserProps){
        
        const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            // Verifica se a senha está correta
            const isPasswordValid = await prisma.user.findFirst({ where: { password } });
            if (!isPasswordValid) {
                throw new Error('Senha inválida');
            }

            return user;
        
    }
}

export { AuthUserService }