import fastify from "fastify";
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import { routes } from "./routes.ts";


import bcrypt from 'bcrypt';
import fastifyJWT  from 'fastify-jwt';


export const app = fastify({ logger: true})
dotenv.config()

app.register(fastifyJWT, {
    secret: 'YADSADADAY', // Substitua por uma chave forte e segura
  });

app.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
});

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message})
})

const start = async () => {
    app.register(cors)
    app.register(routes)

    try {
        await app.listen({ port: 8080, host: "0.0.0.0"}),
        console.log(`Servidor rodando na porta 3333`)

    } catch (error) {
        console.log(error)
    }
}

start()