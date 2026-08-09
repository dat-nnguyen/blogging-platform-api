import express from 'express';
import postRoutes from './routes/postRoutes.js';

const app = express();

/**
 * Middleware Setup
 */
// Parse incoming requests with JSON payloads
app.use(express.json());

/**
 * API Routes
 */
// Mount post routes under /api/posts prefix
app.use('/api/posts', postRoutes);

/**
 * Health Check Endpoint
 */
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Blogging Platform API is running' });
});

/**
 * 404 Fallback Handler for Unknown Routes
 */
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

export default app;