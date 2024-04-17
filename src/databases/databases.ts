import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: 5432,
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async query(sql: string, params?: any[]): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      console.log("Executing query:", sql);
      console.log("params:", params);
      const result = await client.query(sql, params);
      return result.rows;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      client.release();
    }
  }
}
