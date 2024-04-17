import express from 'express';
import { planTrips, assignTrucks } from '../controlllers/apiController';

const router = express.Router();

// Definir la ruta para planificar viajes
router.post('/plantrips', planTrips);

// Definir la ruta para asignar camiones
router.post('/assigntrucks', assignTrucks);

export default router;
