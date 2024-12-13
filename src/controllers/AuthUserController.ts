import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { AuthUserService } from "../services/AuthUserService"
import prismaClient from "../prisma";

export interface DataUserProps{
    token: string,
    email: string,
    password: string,
}
class AuthUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const { token, email, password } = request.body as DataUserProps;

        try {
            const user =  new AuthUserService();

            const userAuth = user.execute({token ,email, password})
            
            reply.send(userAuth);
        } catch (error) {
            reply.status(400).send({ error: error.message });
        }

            }
}

export { AuthUserController }