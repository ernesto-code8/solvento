import express, { Application } from 'express';
import solventoRoutes from './routes/solventoRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT = process.env.NODE_PORT || 3000; 

app.use(express.json()); // Middleware para parsear JSON

// Integrar las rutas de viajes
app.use('/api', solventoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
