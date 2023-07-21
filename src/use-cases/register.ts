import { UsersRepository } from "@/repositories/interfaces/users-repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  email: string; name: string; password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async register({ email, name, password }: RegisterUseCaseRequest) {

    const userWithSameEmail = await this.usersRepository.findUserByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name: name,
      email: email,
      password: password,
    });
  }
}