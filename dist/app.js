"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const routes_1 = require("./routes/routes");
const swaggerDocument = __importStar(require("./swagger/swagger.json"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS setup
const allowAll = process.env.ALLOW_ALL_ORIGINS === 'true';
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ];
app.use((0, cors_1.default)({
    origin: allowAll ? true : allowedOrigins,
    credentials: true,
}));
const path_1 = __importDefault(require("path"));
const upload_middleware_1 = require("./middlewares/upload.middleware");
// Serve static files (like uploaded images)
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../public/uploads")));
const handleImageUpload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
};
// Upload endpoint. Keep the legacy route and expose the API-versioned route used by the frontend axios client.
app.post("/upload", upload_middleware_1.upload.single("image"), handleImageUpload);
app.post("/api/v1/upload", upload_middleware_1.upload.single("image"), handleImageUpload);
(0, routes_1.RegisterRoutes)(app);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Global error handler for clean API responses
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
});
app.get('/', (req, res) => {
    res.send('Hello World! Server is working 🚀');
});
exports.default = app;
