import { UsersRepository } from "@/infra/repositories";

export class LoadUserByIdService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async load(id: string) {
    const user = this.usersRepository.findById(id);

    return user;
  }
}
