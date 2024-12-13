import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { AuthUserService } from "../services/AuthUserService"
import prismaClient from "../prisma";

const jwt = require('fastify-jwt');

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
            
            reply.send({token});
        } catch (error) {
            reply.status(400).send({ error: error.message });
        }

            }
}

export { AuthUserController }