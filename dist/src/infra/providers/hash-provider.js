"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashProvider = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class HashProvider {
    async createHash(plaintext, salt) {
        return bcrypt_1.default.hash(plaintext, salt);
    }
    async compareHash(plaintext, digest) {
        return bcrypt_1.default.compare(plaintext, digest);
    }
}
exports.HashProvider = HashProvider;
//# sourceMappingURL=hash-provider.js.map