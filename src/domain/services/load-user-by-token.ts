import { UsersRepository } from "@/infra/repositories";
import { JwtProvider } from "@/infra/providers";
import env from "@/config/env";

export class LoadUserByTokenService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtProvider: JwtProvider
  ) {}

  async load(token: string) {
    const tokenDecrypted = this.jwtProvider.decryptToken(token, env.jwtSecret);

    if (tokenDecrypted) {
      const userEmail = tokenDecrypted["id"];
      const user = await this.usersRepository.findByEmail(userEmail);
      if (user) {
        return user;
      }
    }
    return null;
  }
}
