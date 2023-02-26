"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRuleService = void 0;
class CreateRuleService {
    constructor(rulesRepository) {
        this.rulesRepository = rulesRepository;
    }
    async create(param) {
        return this.rulesRepository.create({ ...param });
    }
}
exports.CreateRuleService = CreateRuleService;
//# sourceMappingURL=create-rule.js.map