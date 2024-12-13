import fastify, { FastifyRequest, FastifyReply } from "fastify";
import { AuthUserService } from "../services/AuthUserService"

interface LoginRequest {
      email: string;
      password: string;
  }
  
class AuthUserController {
    private authService: AuthUserService;
  
    constructor() {
      this.authService = new AuthUserService();
    }
  
    async login(req: FastifyRequest, reply: FastifyReply) {
      const { email, password } = req.body as LoginRequest; 
  
      try {
        const token = await this.authService.login(email, password);
        return reply.status(200).send({ token });
      } catch (err) {
        return reply.status(401).send({ message: err.message });
      }
    }
  }
export { AuthUserController }