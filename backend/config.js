import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.port || 3001;
export const MONGODB_URL = process.env.MONGODB_URL;

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
