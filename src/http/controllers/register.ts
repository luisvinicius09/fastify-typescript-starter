import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  try {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = registerBodySchema.parse(req.body);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      }
    });

    return reply.status(201).send(user);
  } catch (err) {
    throw new Error("Something went wrong");
  }
}