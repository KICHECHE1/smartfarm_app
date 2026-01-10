import mysql from "mysql2/promise";

// MySQL connection utility for server-side data fetching
export async function getMysqlConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nixa.Said1",
    database: "smartfarm",
  });
  return connection;
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
