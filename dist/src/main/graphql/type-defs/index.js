"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_1 = require("@graphql-tools/merge");
const base_1 = __importDefault(require("./base"));
const user_1 = __importDefault(require("./user"));
const rifa_1 = __importDefault(require("./rifa"));
const payment_1 = __importDefault(require("./payment"));
exports.default = (0, merge_1.mergeTypeDefs)([base_1.default, user_1.default, rifa_1.default, payment_1.default]);
//# sourceMappingURL=index.js.map