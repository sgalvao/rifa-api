"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtProvider = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtProvider {
    constructor() {
        this.encryptToken = (plaintext, secret) => {
            return jsonwebtoken_1.default.sign({ id: plaintext }, secret);
        };
        this.decryptToken = (ciphertext, secret) => {
            return jsonwebtoken_1.default.verify(ciphertext, secret);
        };
    }
}
exports.JwtProvider = JwtProvider;
//# sourceMappingURL=jwt-provider.js.map