import bcrypt from "bcrypt";

export class HashProvider {
  public async createHash(plaintext: string, salt: number): Promise<string> {
    return bcrypt.hash(plaintext, salt);
  }

  public async compareHash(
    plaintext: string,
    digest: string
  ): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
