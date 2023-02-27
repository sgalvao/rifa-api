import { User } from "@/domain/entities/User";
import { UsersRepository } from "@/infra/repositories/UserRepository";

export class CreateAccountService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async create(
    param: CreateAccountService.Params
  ): Promise<CreateAccountService.Result> {
    const validateEmail = await this.usersRepository.findByEmail(param.email);
    const validatePhone = await this.usersRepository.findByPhone(param.phone);

    if (validatePhone) {
      throw new Error("Telefone já cadastrado!");
    }

    if (validateEmail) {
      throw new Error("Email já cadastrado!");
    }

    return this.usersRepository.create({
      ...param,
    });
  }
}

export namespace CreateAccountService {
  export type Params = {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  export type Result = User;
}
