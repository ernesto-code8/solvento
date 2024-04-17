import { Request, Response } from 'express';
import { PlannerService } from '../services/PlannerService';

const plannerService = new PlannerService(); // Instancia del servicio

export const planTrips = async (req: Request, res: Response) => {
    try {        
        const plan_trips = await plannerService.planTrips(req.body.planningDate);
        res.status(200).json(plan_trips);
    } catch (error) {
        res.status(500).send('Error retrieving plan_trips');
    }
};

export const assignTrucks = async (req: Request, res: Response) => {    try {
        const assign_trucks = await plannerService.assignTrucks(req.body.planningDate);
        res.status(201).json(assign_trucks);
    } catch (error) {
        res.status(500).send('Error creating assign_trucks');
    }
};
