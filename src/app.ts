import express, { Application } from "express";
import solventoRoutes from "./routes/solventoRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const PORT = process.env.NODE_PORT || 4000;

app.use(express.json()); // Middleware para parsear JSON
app.use(cors());

// Integrar las rutas de viajes
app.use("/api", solventoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
