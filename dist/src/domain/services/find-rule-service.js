"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindRuleService = void 0;
class FindRuleService {
    constructor(ruleRepository) {
        this.ruleRepository = ruleRepository;
    }
    async findAll() {
        const rules = this.ruleRepository.findAll();
        return rules;
    }
}
exports.FindRuleService = FindRuleService;
//# sourceMappingURL=find-rule-service.js.map