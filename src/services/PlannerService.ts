import { Database } from '../databases/databases';
import { TripPlan } from '../dto/TripPlan';
import { TruckAssignment } from '../dto/TruckAssignment';
import { State } from '../enums/State';
import { WorkDays } from '../enums/WorkDays';


import dotenv from 'dotenv';

dotenv.config();

export class PlannerService {
    async planTrips(date: string): Promise<TripPlan[]> {      
        const sql = `
            SELECT 
                p.id AS purchase_id,
                STRING_AGG(DISTINCT a.zipCode, ', ') AS zipCodes
            FROM 
                Purchase p
            JOIN 
                PurchaseAddress pa ON p.id = pa.purchase_id
            JOIN 
                Address a ON pa.address_id = a.id
            WHERE 
                p.trip_id IS NULL
            GROUP BY 
                p.id
            HAVING 
                COUNT(DISTINCT a.zipCode) <= $1;
        `;

        const tripPlans = [];
        const result = await Database.getInstance().query(sql,[process.env.CANT_VISITAS_TRUCK]);

        for (const row of result) {
            const sql = `INSERT INTO Trip (departure, state, truck_id) VALUES ($1, $2,$3) RETURNING *;`;
            const insertResultTrip = await  Database.getInstance().query(sql,[date,State.Pending,null]);

            const sqlUpdate = `UPDATE Purchase SET trip_id = $1, deliveryDate = $2 WHERE id = $3;`;
            // const updateResultPurchase= await  Database.getInstance().query(sqlUpdate,[insertResultTrip[0].id,date,row.id]);
           Database.getInstance().query(sqlUpdate,[insertResultTrip[0].id,date,row.purchase_id]);

            const tripPlan : TripPlan = {
                tripId: insertResultTrip[0].id,
                zipCodes: row.zipcodes.split(', ')
            };
           tripPlans.push(tripPlan);
        }
          return tripPlans;
    }

    async assignTrucks(date: string): Promise<TruckAssignment[]> {
        // Simular la asignación de camiones
        const sqlPendingTrips = `
        SELECT 
            t.id AS trip_id,
            p.weight AS total_weight
        FROM 
            Trip t
        JOIN 
            Purchase p ON t.id = p.trip_id
        WHERE 
            t.state = $1
        GROUP BY 
            t.id,
            p.weight;
      `;
      const sqlAvailableTrucks = `
      SELECT t.id, t.plateNumber
      FROM Truck as t
      LEFT JOIN Trip tr ON t.id = tr.truck_id
      WHERE maxWeightCapacity >= $1 
        AND workDays = $2
        AND tr.truck_id IS NULL;  
    `;
        // const sql = 'SELECT * FROM truck';
        const pendingTrips = await Database.getInstance().query(sqlPendingTrips,[State.Pending]);
      //  console.log("pendingTrips: " + pendingTrips.length);
        
        const truckPlans = [];
        const dateObject: Date = new Date(date);
  
        for (const row of pendingTrips){
            let trip = "";
            let plateNumber = "";
            let error = "";
    
           const days =  Object.values(WorkDays);
           let dayWeek = days[dateObject.getDay()].toString();

           console.log(row.total_weight);

           const availableTrucks = await Database.getInstance().query(sqlAvailableTrucks,[row.total_weight, dayWeek]);
           console.log(availableTrucks);

             if(availableTrucks.length == 1){
                trip = "Trip "+row.trip_id;
                plateNumber = availableTrucks[0].platenumber;
             }
             else if (availableTrucks.length > 1){
                trip = "Trip "+row.trip_id;
                let random = getRandomInt(availableTrucks.length-1) // para que no escoja siempre el mismo camion
                plateNumber = availableTrucks[random].platenumber;             
             }
             else{
                trip = "Trip "+row.trip_id;
                plateNumber = "";
                error = "Error: No trucks meet requirements";
             }
             if(error == ""){
                let sqlUpdaTrip = `UPDATE Trip SET truck_id = $1 , state = $2 WHERE id = $3;`;
                Database.getInstance().query(sqlUpdaTrip,[availableTrucks[0].id, State.OnTrip ,row.trip_id]);
             }
             const truckAssignment : TruckAssignment = {
                tripNameId: trip,
                plateNumber: plateNumber,
                error: error
            };
            truckPlans.push(truckAssignment);
        }     
       return truckPlans;
    }  
  
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

