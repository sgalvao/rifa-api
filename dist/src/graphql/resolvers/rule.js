"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("@/domain/services");
const find_rule_service_1 = require("@/domain/services/find-rule-service");
const repositories_1 = require("@/infra/repositories");
const makeCreateRule = () => {
    const ruleRepository = new repositories_1.RuleRepository();
    const createRuleService = new services_1.CreateRuleService(ruleRepository);
    return createRuleService;
};
const makeFindRules = () => {
    const ruleRepository = new repositories_1.RuleRepository();
    const findRulesService = new find_rule_service_1.FindRuleService(ruleRepository);
    return findRulesService;
};
exports.default = {
    Query: { findAllRules: () => makeFindRules().findAll() },
    Mutation: {
        createRule: async (_, { rule }, { userId }) => {
            console.log("🚀 ~ file: rule.ts ~ line 14 ~ createRule: ~ rule", rule);
            return makeCreateRule().create({ ...rule, authorId: userId });
        },
    },
};
//# sourceMappingURL=rule.js.map