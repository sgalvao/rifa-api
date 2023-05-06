import jwt from "jsonwebtoken"

export class JwtProvider {
	encryptToken = async (plaintext: string, secret: string): Promise<string> => {
		return jwt.sign({ id: plaintext }, secret)
	}

	decryptToken = async (ciphertext: string, secret: string): Promise<string | jwt.JwtPayload> => {
		return jwt.verify(ciphertext, secret) as Promise<string | jwt.JwtPayload>
	}
}
