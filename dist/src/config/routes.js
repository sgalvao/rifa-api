"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const setupRoutes = (app) => {
    app.get('/api', (_, res) => {
        res.send('API online!');
    });
};
exports.setupRoutes = setupRoutes;
//# sourceMappingURL=routes.js.map