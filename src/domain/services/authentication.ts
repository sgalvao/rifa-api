import { UsersRepository } from "@/infra/repositories";
import { User } from "../entities";
import env from "@/config/env";
import { JwtProvider } from "@/infra/providers";

export class AuthenticationService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtProvider: JwtProvider
  ) {}

  async auth(params: AuthenticationService.Params) {
    const user = await this.usersRepository.findByPhone(params.phone);

    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const token = this.jwtProvider.encryptToken(user.phone, env.jwtSecret);

    return Object.assign(user, { token });
  }
}

export namespace AuthenticationService {
  export type Params = {
    phone: string;
  };
  export type Result = User;
}
