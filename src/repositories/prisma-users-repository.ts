import { prisma } from "@/lib/prisma";
import { User, Prisma } from "@prisma/client";
import { UsersRepository } from "@/repositories/interfaces/users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data: data,
    })

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })

    return user;
  }
}