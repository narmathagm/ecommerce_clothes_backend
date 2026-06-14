"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = Number(process.env.PORT) || 5000;
const startServer = async () => {
    try {
        await database_1.sequelize.sync();
        console.log('✅ Database synced');
        const server = http_1.default.createServer(app_1.default);
        server.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
            console.log(`📘 Swagger at http://localhost:${PORT}/api-docs`);
        });
    }
    catch (err) {
        console.error('❌ Failed to start server', err);
        process.exit(1);
    }
};
startServer();
