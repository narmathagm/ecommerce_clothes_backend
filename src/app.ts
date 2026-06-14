import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from "./routes/routes";
import * as swaggerDocument from "./swagger/swagger.json";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const allowAll = process.env.ALLOW_ALL_ORIGINS === 'true';
const allowedOrigins = process.env.ALLOWED_ORIGINS
	? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
	: [
		"http://localhost:5173",
		"http://127.0.0.1:5173",
	];

app.use(
	cors({
		origin: allowAll ? true : allowedOrigins,
		credentials: true,
	})
);

import path from "path";
import { upload } from "./middlewares/upload.middleware";

// Serve static files (like uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

const handleImageUpload = (req: express.Request, res: express.Response) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
};

// Upload endpoint. Keep the legacy route and expose the API-versioned route used by the frontend axios client.
app.post("/upload", upload.single("image"), handleImageUpload);
app.post("/api/v1/upload", upload.single("image"), handleImageUpload);

RegisterRoutes(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Global error handler for clean API responses
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ message });
});

app.get('/', (req, res) => {
	res.send('Hello World! Server is working 🚀');
});

export default app;
