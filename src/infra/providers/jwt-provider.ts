import jwt from "jsonwebtoken";

export class JwtProvider {
  encryptToken = (plaintext: string, secret: string): Promise<string> => {
    return jwt.sign({ id: plaintext }, secret);
  };

  decryptToken = (ciphertext: string, secret: string): Promise<string> => {
    return jwt.verify(ciphertext, secret) as any;
  };
}
